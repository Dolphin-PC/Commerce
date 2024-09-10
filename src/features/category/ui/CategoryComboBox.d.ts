interface Props {
    defaultCategoryId?: number;
    onSelect: (id: number) => void;
}
/**
 * @desc 카테고리 선택 콤보박스
 * - 내부에서 카테고리 목록을 조회하여 사용
 */
declare const CategoryComboBox: ({ onSelect, defaultCategoryId }: Props) => import("react/jsx-runtime").JSX.Element;
export default CategoryComboBox;
