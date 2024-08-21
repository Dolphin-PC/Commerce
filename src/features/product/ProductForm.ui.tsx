import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { ProductSchema } from "./product.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Column from "@/shared/components/styles/Column";
import { Button } from "@/shared/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";

const ProductForm = () => {
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
  });

  const handleNew = () => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleNew)}>
        <Column gap={20}>
          <FormField
            control={form.control}
            name=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <button type="button" onClick={togglePasswordVisibility}>
                  <small>{passwordVisible ? "Hide" : "Show"}</small>
                </button>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Sign In</Button>
        </Column>
      </form>
    </Form>
  );
};

export default ProductForm;
