import { useCategoryListQuery } from "@/features/category/api/get_list-category";
import ProductCardList from "@/features/product/ui/ProductCardList";
import Grid from "@/shared/components/atoms/Grid";
import Row from "@/shared/components/atoms/Row";
import { Lead } from "@/shared/components/atoms/Typography";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Link } from "react-router-dom";

/**
 * @desc 홈 > 카테고리별 상품 섹션
 */

const CategoryProductList = () => {
  const { data, isLoading } = useCategoryListQuery({});

  return (
    <Card>
      <CardHeader>
        <CardTitle>카테고리별 상품</CardTitle>
      </CardHeader>

      <CardContent>
        {!isLoading && !data && <div>카테고리 정보가 없어요.</div>}
        {data && (
          <Tabs defaultValue={String(data[0].id)} className="w-full h-full overflow-scroll scrollbar-hide">
            <TabsList>
              {data.map((category) => (
                <TabsTrigger key={category.id} value={String(category.id)}>
                  {category.categoryName}
                </TabsTrigger>
              ))}
            </TabsList>
            {data.map((category) => {
              return (
                <TabsContent key={category.id} value={String(category.id)} className="sticky left-0">
                  <Row className="justify-between">
                    <Lead>{category.categoryName}</Lead>
                    <Button variant="link">
                      <Link to="">더보기</Link>
                    </Button>
                  </Row>
                  <Grid className="grid-cols-4 gap-3">
                    <ProductCardList category={category} />
                  </Grid>
                </TabsContent>
              );
            })}
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryProductList;
