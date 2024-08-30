import MainLayout from "@/widgets/layout/MainLayout";
import CategoryProductList from "./ui/CategoryProductList";
import { HomePageHelmet } from "../Helmets";

const HomePage = () => {
  return (
    <MainLayout>
      <HomePageHelmet />
      <CategoryProductList />
    </MainLayout>
  );
};

export default HomePage;
