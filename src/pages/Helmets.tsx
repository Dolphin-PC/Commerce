import { Helmet } from "react-helmet-async";
/**
 * @desc 페이지들의 Helmet
 */

const title = "Banana Shop";

export const HomePageHelmet = () => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export const ProductPageHelmet = () => {
  return (
    <Helmet>
      <title>{title} | 상품 목록</title>
    </Helmet>
  );
};

export const ProductDetailPageHelmet = () => {
  return (
    <Helmet>
      <title>{title} | 상품 상세</title>
    </Helmet>
  );
};

export const DashBoardPageHelmet = () => {
  return (
    <Helmet>
      <title>{title} | 대시보드</title>
    </Helmet>
  );
};
