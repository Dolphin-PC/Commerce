import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { Small } from "@/shared/components/atoms/Typography";
import { Checkbox } from "@/shared/components/ui/checkbox";
import * as Slider from "@radix-ui/react-slider";
import _ from "lodash";
import { useCallback, useState } from "react";
import { useSearchDrawerStore } from "../store/useSearchDrawerStore";
const MIN = 0;
const MAX = 1000000;
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
    const handlePriceRangeChange = (value) => {
        setPriceRange(value);
        onPriceRangeChangeEnd(value);
    };
    // state변경시, 함수가 재선언되어 debounce가 초기화되는 문제 방지
    const onPriceRangeChangeEnd = useCallback(_.debounce((value) => {
        drawerStore.setPriceRange(value);
    }, 300), []);
    const [isOverOneMillion, setIsOverOneMillion] = useState(false);
    const handleIsOverOneMillionChange = (checked) => {
        let check = !!checked;
        setIsOverOneMillion(check);
        if (check) {
            setPriceRange([1000000, Infinity]);
            drawerStore.setPriceRange([1000000, Infinity]);
        }
        else {
            drawerStore.setPriceRange(priceRange);
        }
    };
    return (_jsxs(Column, { className: "gap-4", children: [_jsx(Small, { children: _jsx("p", { children: priceRange.map((e) => e.toLocaleString("ko-KR") + "원").join(" ~ ") }) }), _jsxs(Slider.Root, { disabled: isOverOneMillion, min: MIN, max: MAX, value: priceRange, step: COST_STEP, onValueChange: handlePriceRangeChange, className: "relative flex items-center select-none touch-none w-full h-5", children: [_jsx(Slider.Track, { className: "bg-slate-300 relative grow rounded-full h-[3px]", children: _jsx(Slider.Range, { className: "absolute bg-slate-700 rounded-full h-full" }) }), _jsx(Slider.Thumb, { className: "block w-5 h-5 bg-red-400  rounded-[10px] ", "aria-label": "Volume" }), _jsx(Slider.Thumb, { className: "block w-5 h-5 bg-blue-300  rounded-[10px] ", "aria-label": "Volume" })] }), _jsxs(Row, { className: "items-center gap-2", children: [_jsx(Checkbox, { id: "one_million", checked: isOverOneMillion, onCheckedChange: handleIsOverOneMillionChange }), _jsx("label", { htmlFor: "one_million", className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: "1,000,000\uC6D0 \uC774\uC0C1" })] })] }));
};
export default PriceRangeSlider;
