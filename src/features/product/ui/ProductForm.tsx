import { useForm } from "react-hook-form";
import { ProductFormDataType, ProductSchema } from "../model/product.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Column from "@/shared/components/styles/Column";
import { Button } from "@/shared/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import CategoryComboBox from "@/features/category/ui/CategoryComboBox";
import { Textarea } from "@/shared/components/ui/textarea";
import { useAuthStore } from "../../@auth/store/auth.store";
import { useState } from "react";
import { addProduct } from "@/features/product/api/post-product";
import { addProductImage } from "@/features/product_image/api/product-image-new.api";
import ProductImageSection from "./ProductImageSection";

const ProductForm = () => {
  const user = useAuthStore((state) => state.user);
  const form = useForm<ProductFormDataType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      categoryId: 0,
      name: "",
      desc: "",
      price: 0,
      quantity: 0,
    },
  });

  const [images, setImages] = useState<File[]>([]);

  const handleNew = async (formData: ProductFormDataType) => {
    if (user === null) throw Error("로그인이 필요합니다.");

    const uploadImages = images.filter((e) => e !== null) as File[];

    if (uploadImages.length === 0)
      return alert("하나 이상의 이미지를 업로드해주세요.");

    const newProduct = await addProduct({
      categoryId: formData.categoryId,
      name: formData.name,
      desc: formData.desc,
      price: formData.price,
      quantity: formData.quantity,
      sellerId: user.id,
    });

    if (newProduct === null) return alert("상품 등록에 실패했습니다.");

    await Promise.all(
      uploadImages.map((image) =>
        addProductImage({
          productId: newProduct.id,
          file: image,
        })
      )
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleNew)}>
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

          {/* <FormField
            control={form.control}
            name="discountType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>상품할인 구분</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="할인 구분을 선택해주세요." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={null}>미선택</SelectItem>
                    <SelectItem value={discountTypes.PERCENT}>
                      퍼센트
                    </SelectItem>
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
                  <Input
                    type="number"
                    min={0}
                    placeholder="상품할인 가격"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormLabel>상품 이미지</FormLabel>
          <ProductImageSection images={images} setImages={setImages} />

          <Button type="submit">저장하기</Button>
        </Column>
      </form>
    </Form>
  );
};

export default ProductForm;
