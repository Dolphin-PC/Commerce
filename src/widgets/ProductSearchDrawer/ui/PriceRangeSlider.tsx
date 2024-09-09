import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { Small } from "@/shared/components/atoms/Typography";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import * as Slider from "@radix-ui/react-slider";
import _ from "lodash";
import { useCallback, useState } from "react";
import { useSearchDrawerStore } from "../store/useSearchDrawerStore";

const MIN = 0;
const MAX = 1_000_000;
const COST_STEP = 1000;

/**
 * @desc 상품 가격 범위
 */
const PriceRangeSlider = () => {
  // 실제데이터 가격범위
  const drawerStore = useSearchDrawerStore((state) => ({
    setPriceRange: state.setPriceRange,
    priceRange: state.priceRange,
  }));
  // 슬라이더 표시용 가격범위
  const [priceRange, setPriceRange] = useState(drawerStore.priceRange);

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
    onPriceRangeChangeEnd(value);
  };

  // state변경시, 함수가 재선언되어 debounce가 초기화되는 문제 방지
  const onPriceRangeChangeEnd = useCallback(
    _.debounce((value: number[]) => {
      drawerStore.setPriceRange(value);
    }, 300),
    []
  );

  const [isOverOneMillion, setIsOverOneMillion] = useState(false);

  const handleIsOverOneMillionChange = (checked: CheckedState) => {
    let check = !!checked;
    setIsOverOneMillion(check);

    if (check) {
      setPriceRange([1_000_000, Infinity]);
      drawerStore.setPriceRange([1_000_000, Infinity]);
    } else {
      drawerStore.setPriceRange(priceRange);
    }
  };

  return (
    <Column className="gap-4">
      <Small>
        <p>{priceRange.map((e) => e.toLocaleString("ko-KR") + "원").join(" ~ ")}</p>
      </Small>
      <Slider.Root
        disabled={isOverOneMillion}
        min={MIN}
        max={MAX}
        value={priceRange}
        step={COST_STEP}
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

export default PriceRangeSlider;
