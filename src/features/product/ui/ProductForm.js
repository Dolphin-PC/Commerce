import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CategoryComboBox from "@/features/category/ui/CategoryComboBox";
import Column from "@/shared/components/atoms/Column";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ProductSchema } from "../model/product.zod";
import { discountTypes } from "../type/type";
import ProductImageSection from "../../product_image/ui/ProductImageSection";
/**
 * @desc 상품 등록 폼
 * @param {ProductCategory} - 상품 정보(카테고리 포함)
 * @param {ProductImage} - 상품 이미지
 *
 * @example <ProductForm productCategory={productCategory} productImage={productImage} />
 */
const ProductForm = ({ productCategory: prdt, productImages, onSave }) => {
    const form = useForm({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            categoryId: prdt?.category?.id ?? 0,
            name: prdt?.name ?? "",
            desc: prdt?.desc ?? "",
            price: prdt?.price ?? 0,
            quantity: prdt?.quantity ?? 0,
            discountType: prdt?.discountType ?? discountTypes.NONE,
            discountValue: prdt?.discountValue ?? 0,
        },
    });
    // 새로 등록될 이미지 상태
    const [images, setImages] = useState([]);
    const onSubmit = (formData) => onSave(formData, images);
    return (_jsx(Form, { ...form, children: _jsx("form", { onSubmit: form.handleSubmit(onSubmit), children: _jsxs(Column, { className: "gap-3", children: [_jsx(FormField, { control: form.control, name: "categoryId", render: () => {
                            const handleSelect = (id) => form.setValue("categoryId", id);
                            return (_jsxs(FormItem, { children: [_jsxs(Column, { className: "gap-[10px]", children: [_jsx(FormLabel, { children: "\uC0C1\uD488 \uCE74\uD14C\uACE0\uB9AC" }), _jsx(FormControl, { children: _jsx(CategoryComboBox, { onSelect: handleSelect }) })] }), _jsx(FormMessage, {})] }));
                        } }), _jsx(FormField, { control: form.control, name: "name", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "\uC0C1\uD488\uBA85" }), _jsx(FormControl, { children: _jsx(Input, { type: "text", placeholder: "\uC0C1\uD488\uBA85", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "desc", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "\uC0C1\uD488\uC124\uBA85" }), _jsx(FormControl, { children: _jsx(Textarea, { placeholder: "\uC0C1\uD488\uC124\uBA85", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "price", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "\uC0C1\uD488\uAC00\uACA9" }), _jsx(FormControl, { children: _jsx(Input, { type: "number", placeholder: "\uC0C1\uD488\uAC00\uACA9", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "quantity", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "\uC0C1\uD488\uC218\uB7C9" }), _jsx(FormControl, { children: _jsx(Input, { type: "number", placeholder: "\uC0C1\uD488\uC218\uB7C9", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "discountType", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "\uC0C1\uD488\uD560\uC778 \uAD6C\uBD84" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "\uD560\uC778 \uAD6C\uBD84\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694." }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: discountTypes.NONE, children: "\uD560\uC778 \uC5C6\uC74C" }), _jsx(SelectItem, { value: discountTypes.PERCENT, children: "\uD37C\uC13C\uD2B8" }), _jsx(SelectItem, { value: discountTypes.COST, children: "\uAC00\uACA9" })] })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "discountValue", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "\uC0C1\uD488\uD560\uC778 \uAC00\uACA9" }), _jsx(FormControl, { children: _jsx(Input, { type: "number", min: 0, placeholder: "\uC0C1\uD488\uD560\uC778 \uAC00\uACA9", ...field, disabled: form.getValues("discountType") === discountTypes.NONE }) }), _jsx(FormMessage, {})] })) }), _jsx(FormLabel, { children: "\uC0C1\uD488 \uC774\uBBF8\uC9C0" }), _jsx(ProductImageSection, { images: images, setImages: setImages, savedImages: productImages }), _jsx(Button, { type: "submit", children: "\uC800\uC7A5\uD558\uAE30" })] }) }) }));
};
export default ProductForm;
