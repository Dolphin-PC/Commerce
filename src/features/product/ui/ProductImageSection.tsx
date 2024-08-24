import { ProductImage } from "@/features/product_image/type/type";
import { Column } from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { ConfirmDialog } from "@/shared/components/molecules/ConfirmDialog";
import { Button } from "@/shared/components/ui/button";
import { ImageUp, CircleMinus, ImagePlus } from "lucide-react";

interface Props {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;

  savedImages?: ProductImage[];
  setSavedImages?: React.Dispatch<React.SetStateAction<ProductImage[]>>;
}

const ProductImageSection = ({ images, setImages, savedImages = [], setSavedImages }: Props) => {
  //* 이미지 업로드 버튼 클릭 이벤트
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

  // 새로 추가된 이미지 파일 삭제
  const deleteImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));

    // 버튼의 부모 요소를 찾고, 그 부모 요소의 자식 요소 중 파일 입력 요소를 선택합니다.
    const parentElement = e.currentTarget.parentElement;
    if (parentElement) {
      const inputElement = parentElement.querySelector('input[type="file"]') as HTMLInputElement;
      if (inputElement) {
        inputElement.value = ""; // 파일 입력 요소의 값을 초기화합니다.
      }
    }
  };

  // 기존 이미지 bucket에서 삭제
  const deleteSavedImage = async (index: number) => {
    console.log("deleteSavedImage", index);
  };

  return (
    <Column className="gap-10">
      <Row className="gap-10">
        {/* 새로 추가되는 이미지 */}
        {images.map((image, index) => (
          <Column key={index} className="w-30">
            <Row className="relative">
              <Button type="button" variant={"outline"} className="w-24 h-24">
                <ImageUp />
              </Button>

              <Button type="button" className="absolute -right-3 -top-3 z-10 w-12 h-8" onClick={(e) => deleteImage(e, index)}>
                <CircleMinus />
              </Button>
            </Row>
            <small className="overflow-hidden w-24 whitespace-nowrap text-ellipsis">{image.name}</small>
          </Column>
        ))}
        {images.length + savedImages.length < 5 && (
          <Button type="button" variant={"outline"} className="w-24 h-24" onClick={handleClickFile}>
            <ImagePlus />
          </Button>
        )}
      </Row>

      <Row>
        {/* 기존 이미지 */}
        {savedImages.map((image, index) => (
          <div key={index} className="relative">
            <img src={image.imgUrl} alt={image.imgUrl} className="w-24 h-24 object-cover" />
            <ConfirmDialog
              title="정말 삭제하시겠습니까?"
              description="삭제된 이미지는 복구 불가합니다."
              cancelText="취소"
              cancelAction={() => {}}
              confirmText="삭제"
              confirmAction={() => deleteSavedImage(index)}
              triggerComponent={
                <Button type="button" className="absolute -right-3 -top-3 z-10 w-12 h-8">
                  <CircleMinus />
                </Button>
              }
            >
              <img src={image.imgUrl} alt={image.imgUrl} className="w-full max-h-32 object-cover" />
            </ConfirmDialog>
          </div>
        ))}
      </Row>
    </Column>
  );
};

export default ProductImageSection;
