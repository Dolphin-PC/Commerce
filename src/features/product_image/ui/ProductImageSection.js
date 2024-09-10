import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDeleteProductImage } from "@/features/product_image/api/delete-product-image";
import { Column } from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { ConfirmDialog } from "@/shared/components/molecules/ConfirmDialog";
import { Button } from "@/shared/components/ui/button";
import { toast } from "@/shared/components/ui/use-toast";
import { CircleMinus, ImagePlus } from "lucide-react";
import { bucketBaseUrl } from "../const/bucket";
import { suppertedFormats } from "@/shared/lib/image";
import TooltipHover from "@/shared/components/molecules/TooltipHover";
/**
 * @desc 이미지 업로드 섹션
 */
const ProductImageSection = ({ images, setImages, savedImages = [] }) => {
    const deleteMutation = useDeleteProductImage();
    //* 이미지 업로드 버튼 클릭 이벤트
    const handleClickFile = () => {
        const hiddenFileInput = document.createElement("input");
        hiddenFileInput.type = "file";
        hiddenFileInput.accept = suppertedFormats.join(",");
        hiddenFileInput.onchange = (e) => {
            const file = e.target.files?.[0];
            if (file) {
                setImages((prev) => [...prev, file]);
            }
        };
        hiddenFileInput.click();
    };
    // 새로 추가된 이미지 파일 삭제
    const deleteImage = (e, index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        const parentElement = e.currentTarget.parentElement;
        if (parentElement) {
            const inputElement = parentElement.querySelector('input[type="file"]');
            if (inputElement) {
                inputElement.value = "";
            }
        }
    };
    // 기존에 저장된 이미지를 bucket에서 삭제
    const deleteSavedImage = async (index) => {
        if (!savedImages[index].imgUrl)
            throw new Error("imgUrl is not exist");
        deleteMutation.mutate(savedImages[index], {
            onSuccess: () => {
                toast({ title: "삭제되었습니다." });
            },
        });
    };
    return (_jsxs(Column, { className: "gap-10", children: [_jsxs(Row, { className: "gap-10", children: [images.map((image, index) => (_jsx(Column, { className: "w-30", children: _jsxs(Row, { className: "relative", children: [_jsx(TooltipHover, { triggerComponent: _jsx("img", { src: URL.createObjectURL(image), alt: image.name, className: "w-24 h-24 object-cover rounded-md" }), tooltipContent: image.name }), _jsx(Button, { type: "button", className: "absolute -right-3 -top-3 z-10 w-12 h-8", onClick: (e) => deleteImage(e, index), children: _jsx(CircleMinus, {}) })] }) }, index))), images.length + savedImages.length < 5 && (_jsx(TooltipHover, { triggerComponent: _jsx(Button, { type: "button", variant: "outline", className: "w-24 h-24", onClick: handleClickFile, children: _jsx(ImagePlus, {}) }), tooltipContent: "\uC774\uBBF8\uC9C0 \uCD94\uAC00\uD558\uAE30" }))] }), _jsx(Row, { className: "gap-10", children: savedImages.map((image, index) => (_jsxs("div", { className: "relative", children: [_jsx("img", { src: bucketBaseUrl + "/" + image.thumnailUrl, alt: image.thumnailUrl, className: "w-24 h-24 object-cover" }), _jsx(ConfirmDialog, { title: "\uC815\uB9D0 \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?", description: "\uC0AD\uC81C\uB41C \uC774\uBBF8\uC9C0\uB294 \uBCF5\uAD6C \uBD88\uAC00\uD569\uB2C8\uB2E4.", cancelText: "\uCDE8\uC18C", cancelAction: () => { }, confirmText: "\uC0AD\uC81C", confirmAction: () => deleteSavedImage(index), triggerComponent: _jsx(Button, { type: "button", className: "absolute -right-3 -top-3 z-10 w-12 h-8", children: _jsx(CircleMinus, {}) }), children: _jsx("img", { src: bucketBaseUrl + "/" + image.imgUrl, alt: image.imgUrl, className: "w-full h-full object-cover" }) })] }, index))) })] }));
};
export default ProductImageSection;
