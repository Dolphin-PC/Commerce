import CategoryComboBox from "@/features/category/ui/CategoryComboBox";
import { ProductImage } from "@/features/product_image/type/type";
import Column from "@/shared/components/atoms/Column";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ProductFormDataType, ProductSchema } from "../model/product.zod";
import { discountTypes, ProductCategory } from "../type/type";
import ProductImageSection from "./ProductImageSection";

interface Props {
  productCategory?: ProductCategory;
  productImages?: ProductImage[];
  // handleSave: (data: ProductInsert) => Promise<Product | null>;
  onSave: (formData: ProductFormDataType, images: File[]) => void;
}

/**
 * @desc 상품 등록 폼
 * @param {ProductCategory} - 상품 정보(카테고리 포함)
 * @param {ProductImage} - 상품 이미지
 *
 * @example <ProductForm productCategory={productCategory} productImage={productImage} />
 */
const ProductForm = ({ productCategory: prdt, productImages: imgs, onSave }: Props) => {
  const form = useForm<ProductFormDataType>({
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

  const [savedImages, setSavedImages] = useState<ProductImage[]>(imgs ?? []);
  const [images, setImages] = useState<File[]>([]);

  const onSubmit = (formData: ProductFormDataType) => {
    onSave(formData, images);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Column className="gap-3">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <Column className="gap-[10px]">
                  <FormLabel>상품 카테고리</FormLabel>
                  <FormControl>
                    <CategoryComboBox field={field} form={form} />
                  </FormControl>
                </Column>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>상품명</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="상품명" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>상품설명</FormLabel>
                <FormControl>
                  <Textarea placeholder="상품설명" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>상품가격</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="상품가격" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>상품수량</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="상품수량" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discountType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>상품할인 구분</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="할인 구분을 선택해주세요." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={discountTypes.NONE}>할인 없음</SelectItem>
                    <SelectItem value={discountTypes.PERCENT}>퍼센트</SelectItem>
                    <SelectItem value={discountTypes.COST}>가격</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discountValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>상품할인 가격</FormLabel>
                <FormControl>
                  <Input type="number" min={0} placeholder="상품할인 가격" {...field} disabled={form.getValues("discountType") === discountTypes.NONE} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormLabel>상품 이미지</FormLabel>
          <ProductImageSection images={images} setImages={setImages} savedImages={savedImages} setSavedImages={setSavedImages} />

          <Button type="submit">저장하기</Button>
        </Column>
      </form>
    </Form>
  );
};

export default ProductForm;
