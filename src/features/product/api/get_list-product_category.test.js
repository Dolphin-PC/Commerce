import { renderHook, waitFor } from "@testing-library/react";
import { useProductListCategoryInfiniteQuery } from "./get_list-product_category";
import { queryWrapper } from "@/test/test-util";
describe("제품 목록 조회 | 성공", async () => {
    it("기본 조회", async () => {
        const { result } = renderHook(() => useProductListCategoryInfiniteQuery({}), // Props
        { wrapper: queryWrapper() });
        await waitFor(() => result.current.isSuccess);
        console.log(result.current.data);
        expect(result.current.data).toBeDefined();
    });
    it("판매자 조회", async () => {
        const sellerId = "4a2a3145-46c8-4920-9661-19bd9882ffa1";
        const { result } = renderHook(() => useProductListCategoryInfiniteQuery({ sellerId }), // Props
        { wrapper: queryWrapper() });
        await waitFor(() => result.current.isSuccess);
        console.log(result.current.data);
        result.current.data.pages.forEach((page) => {
            page.data.forEach((data) => {
                expect(data.sellerId).toBe(sellerId);
            });
        });
    });
    it("카테고리 조회", async () => {
        const categoryId = 1;
        const { result } = renderHook(() => useProductListCategoryInfiniteQuery({ categoryId }), // Props
        { wrapper: queryWrapper() });
        await waitFor(() => result.current.isSuccess);
        console.log(result.current.data);
        result.current.data.pages.forEach((page) => {
            page.data.forEach((data) => {
                expect(data.categoryId).toBe(categoryId);
            });
        });
    });
    it("필터링", async () => {
        // given
        const searchText = "갤럭시";
        const categoryIds = [1, 2];
        const priceRange = [100000, 200000];
        // when
        const { result } = renderHook(() => useProductListCategoryInfiniteQuery({ filter: { searchText, categoryIds, priceRange } }), // Props
        { wrapper: queryWrapper() });
        await waitFor(() => result.current.isSuccess);
        console.table(result.current.data.pages[0].data);
        // then
        result.current.data.pages.forEach((page) => {
            page.data.forEach((data) => {
                expect(data.name).toContain(searchText);
                expect(categoryIds).toContain(data.categoryId);
                expect(data.price).toBeGreaterThanOrEqual(priceRange[0]);
                expect(data.price).toBeLessThanOrEqual(priceRange[1]);
            });
        });
    });
});
