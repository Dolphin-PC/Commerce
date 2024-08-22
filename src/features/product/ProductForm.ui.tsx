import { useForm } from "react-hook-form";
import { ProductFormDataType, ProductSchema } from "./product.zod";
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
import CategoryComboBox from "@/entities/category/CategoryComboBox.ui";
import { Textarea } from "@/shared/components/ui/textarea";

const ProductForm = () => {
  const form = useForm<ProductFormDataType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      categoryName: "",
      name: "",
      desc: "",
      price: 0,
      quantity: 0,
      productImages: [],
    },
  });

  const handleNew = (data: ProductFormDataType) => {
    console.log({ data });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleNew)}>
        <Column gap={10}>
          <FormField
            control={form.control}
            name="categoryName"
            render={({ field }) => (
              <FormItem>
                <Column gap={10}>
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

          <Button type="submit">저장하기</Button>
        </Column>
      </form>
    </Form>
  );
};

export default ProductForm;
