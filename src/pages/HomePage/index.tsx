import MainLayout from "@/widgets/MainLayout";
import CategoryProductList from "./ui/CategoryProductList";
import { HomePageHelmet } from "../Helmets";
import { Fragment } from "react/jsx-runtime";

const _HomePage = () => {
  return (
    <Fragment>
      <CategoryProductList />
    </Fragment>
  );
};

export default function HomePage() {
  return (
    <MainLayout>
      <HomePageHelmet />
      <_HomePage />
    </MainLayout>
  );
}
