import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { Small } from "@/shared/components/atoms/Typography";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import * as Slider from "@radix-ui/react-slider";
import { useState } from "react";

/**
 * @desc 상품 가격 범위
 */
const PriceRange = () => {
  const [priceRange, setPriceRange] = useState([10000, 50000]);
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };

  const [isOverOneMillion, setIsOverOneMillion] = useState(false);
  const handleIsOverOneMillionChange = (checked: CheckedState) => {
    setIsOverOneMillion(!!checked);
  };

  return (
    <Column className="gap-4">
      <Small>
        <p className={isOverOneMillion ? "line-through" : ""}>{priceRange.map((e) => e.toLocaleString("ko-KR") + "원").join(" ~ ")}</p>
      </Small>
      <Slider.Root
        disabled={isOverOneMillion}
        min={0}
        max={1_000_000}
        value={priceRange}
        step={1000}
        minStepsBetweenThumbs={10}
        onValueChange={handlePriceRangeChange}
        className="relative flex items-center select-none touch-none w-full h-5"
      >
        <Slider.Track className="bg-slate-300 relative grow rounded-full h-[3px]">
          <Slider.Range className="absolute bg-slate-700 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-5 h-5 bg-red-400  rounded-[10px] " aria-label="Volume" />
        <Slider.Thumb className="block w-5 h-5 bg-blue-300  rounded-[10px] " aria-label="Volume" />
      </Slider.Root>
      <Row className="items-center gap-2">
        <Checkbox id="one_million" checked={isOverOneMillion} onCheckedChange={handleIsOverOneMillionChange} />
        <label htmlFor="one_million" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          1,000,000원 이상
        </label>
      </Row>
    </Column>
  );
};

export default PriceRange;
