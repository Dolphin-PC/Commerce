import { Product } from "@/features/product/type/type";
import { useProductImageQuery } from "../api/get_list-product-image";
import Loading from "@/shared/components/molecules/Loading";
import { bucketBaseUrl } from "../const/bucket";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/components/ui/carousel";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Column from "@/shared/components/atoms/Column";

interface Props {
  productId: Product["id"];

  isButton?: boolean;
  isNumberText?: boolean;

  height: number;
}

/**
 * @desc 상품 이미지 캐러셀
 */
const ProductImageCarousel = ({ productId, isButton, isNumberText, height }: Props) => {
  const { data, isLoading } = useProductImageQuery({ productId });

  const [carousel, setCarousel] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!carousel) return;

    setCount(carousel.scrollSnapList().length);
    setCurrent(carousel.selectedScrollSnap() + 1);

    carousel.on("select", () => setCurrent(carousel.selectedScrollSnap() + 1));
  }, [carousel]);

  if (isLoading) return <Loading />;
  if (!data) return null;
  return (
    <Column className={`h-[${height}px]`}>
      <Carousel setApi={setCarousel} className="h-full flex items-center justify-center">
        <CarouselContent>
          {data.map((img) => (
            <CarouselItem key={img.id}>
              <img src={bucketBaseUrl + "/" + img.imgUrl} alt={String(img.productId)} />
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
      {data.length > 1 && isNumberText && (
        <div className="py-2 text-center text-sm text-muted-foreground">
          {current} of {count}
        </div>
      )}
    </Column>
  );
};

export default ProductImageCarousel;
