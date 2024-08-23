import Column from "@/shared/components/styles/Column";
import Row from "@/shared/components/styles/Row";
import { Button } from "@/shared/components/ui/button";
import { ImageUp, CircleMinus, ImagePlus } from "lucide-react";

interface Props {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

const ProductImageSection = ({ images, setImages }: Props) => {
  const handleClickFile = () => {
    const hiddenFileInput = document.createElement("input");
    hiddenFileInput.type = "file";
    hiddenFileInput.accept = "image/*";
    hiddenFileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setImages((prev) => [...prev, file]);
      }
    };

    hiddenFileInput.click();
  };

  const deleteImage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    setImages((prev) => prev.filter((_, i) => i !== index));

    // 버튼의 부모 요소를 찾고, 그 부모 요소의 자식 요소 중 파일 입력 요소를 선택합니다.
    const parentElement = e.currentTarget.parentElement;
    if (parentElement) {
      const inputElement = parentElement.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (inputElement) {
        inputElement.value = ""; // 파일 입력 요소의 값을 초기화합니다.
      }
    }
  };

  return (
    <Row className="gap-10">
      {images.map((image, index) => (
        <Column key={index} className="w-30">
          <Row className="relative">
            <Button type="button" variant={"outline"} className="w-24 h-24">
              <ImageUp />
            </Button>

            <Button
              type="button"
              className="absolute -right-3 -top-3 z-10 w-12 h-8"
              onClick={(e) => deleteImage(e, index)}
            >
              <CircleMinus />
            </Button>
          </Row>
          <small className="overflow-hidden w-24 whitespace-nowrap text-ellipsis">
            {image.name}
          </small>
        </Column>
      ))}
      {images.length < 5 && (
        <Button
          type="button"
          variant={"outline"}
          className="w-24 h-24"
          onClick={handleClickFile}
        >
          <ImagePlus />
        </Button>
      )}
    </Row>
  );
};

export default ProductImageSection;
