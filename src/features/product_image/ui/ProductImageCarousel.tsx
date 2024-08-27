import { Product } from "@/features/product/type/type";
import { useProductImageQuery } from "../api/get_list-product-image";
import Loading from "@/shared/components/molecules/Loading";
import { bucketBaseUrl } from "../const/bucket";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/components/ui/carousel";
import { Fragment } from "react/jsx-runtime";
import { ReactNode, useEffect, useState } from "react";
import { ProductImage } from "../type/type";
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

interface Props {
  isButton?: boolean;
  height: number;
  width?: number;
}

interface ContainerProps extends Props {
  productId: Product["id"];
}

interface PresenterProps extends Props {
  data: ProductImage[];
}

/** 상품 이미지 캐러셀 컨테이너 */
function Container(props: ContainerProps): ReactNode {
  const { productId, ...rest } = props;
  const { data, isLoading } = useProductImageQuery({ productId });

  if (isLoading) return <Loading />;
  if (!data) return null;

  return <Presenter data={data} {...rest} />;
}

/** 상품 이미지 캐러셀 프레젠터 */
function Presenter({ data, height, width, isButton }: PresenterProps): ReactNode {
  const [carousel, setCarousel] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!carousel) return;

    setCount(carousel.scrollSnapList().length);
    setCurrent(carousel.selectedScrollSnap() + 1);

    carousel.on("select", () => setCurrent(carousel.selectedScrollSnap() + 1));
  }, [carousel]);

  useEffect(() => {
    setCount(data.length);
    setCurrent(1);
  }, [data]);

  return (
    <Fragment>
      <Carousel setApi={setCarousel} className="flex items-center justify-center">
        <CarouselContent>
          {data.map((img) => (
            <CarouselItem key={img.id}>
              <img src={bucketBaseUrl + "/" + img.imgUrl} alt={String(img.productId)} className={cn("p-1 object-cover", `h-[${height}px] ${width ? `w-[${width}px]` : "w-full"}`)} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {isButton && (
          <Fragment>
            <CarouselPrevious />
            <CarouselNext />
          </Fragment>
        )}
      </Carousel>
      {
        <div className="py-2 text-center text-sm text-muted-foreground">
          {current} of {count}
        </div>
      }
    </Fragment>
  );
}
