import { Product } from "@/features/product/type/type";
import { useProductImageQuery } from "../api/get_list-product-image";
import Loading from "@/shared/components/molecules/Loading";
import { bucketBaseUrl } from "../const/bucket";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/components/ui/carousel";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";

interface Props {
  productId: Product["id"];

  isButton?: boolean;

  height: number;
}

/**
 * @desc 상품 이미지 캐러셀
 */
const ProductImageCarousel = ({ productId, isButton, height }: Props) => {
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
    <div>
      <Carousel setApi={setCarousel} className="h-max flex items-center justify-center">
        <CarouselContent>
          {data.map((img) => (
            <CarouselItem key={img.id}>
              <img src={bucketBaseUrl + "/" + img.imgUrl} alt={String(img.productId)} className={`h-[${height}px] object-cover`} />
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
    </div>
  );
};

export default ProductImageCarousel;
