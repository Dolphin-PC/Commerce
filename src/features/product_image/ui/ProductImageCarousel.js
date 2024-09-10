import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useProductImageQuery } from "../api/get_list-product-image";
import Loading from "@/shared/components/molecules/Loading";
import { bucketBaseUrl } from "../const/bucket";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/components/ui/carousel";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { cn } from "@/shared/lib/shadcn-util";
/**
 * @desc 상품 이미지 캐러셀
 *  - Container : 상품 데이터를 조회해서 표시하는 컴포넌트
 *  - Presenter : 상품 데이터를 Props로 받아서 표시하는 컴포넌트
 */
const ProductImageCarousel = {
    Container,
    Presenter,
};
export default ProductImageCarousel;
/** 상품 이미지 캐러셀 컨테이너 */
function Container(props) {
    const { productId, ...rest } = props;
    const { data, isLoading } = useProductImageQuery({ productId });
    if (isLoading)
        return _jsx(Loading, {});
    if (!data)
        return null;
    return _jsx(Presenter, { data: data, ...rest });
}
/** 상품 이미지 캐러셀 프레젠터 */
function Presenter({ data, height, isButton }) {
    const [carousel, setCarousel] = useState();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!carousel)
            return;
        setCount(carousel.scrollSnapList().length);
        setCurrent(carousel.selectedScrollSnap() + 1);
        carousel.on("select", () => setCurrent(carousel.selectedScrollSnap() + 1));
    }, [carousel]);
    useEffect(() => {
        setCount(data.length);
        setCurrent(1);
    }, [data]);
    return (_jsxs("div", { style: { height: `${height}px` }, children: [_jsxs(Carousel, { setApi: setCarousel, children: [_jsx(CarouselContent, { children: data.map((img) => (_jsx(CarouselItem, { children: _jsx("img", { src: bucketBaseUrl + "/" + img.imgUrl, alt: String(img.productId), className: cn("p-1 object-contain w-full"), style: { height: `${height}px` } }) }, img.id))) }), isButton && (_jsxs(Fragment, { children: [_jsx(CarouselPrevious, {}), _jsx(CarouselNext, {})] }))] }), _jsxs("div", { className: "py-2 text-center text-sm text-muted-foreground", children: [current, " of ", count] })] }));
}
