import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Button } from "../shared/ui/ui/button";
import { BuyerRoute, PrivateRoute, SellerRoute } from "./routers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Button>Home</Button>} />
        <Route path="/login" element={<Button>Login</Button>} />

        <Route element={<PrivateRoute isNeedAuth />}>
          <Route element={<SellerRoute isSeller />}>
            <Route path="/dashboard" element={<Button>Dashboard</Button>} />
          </Route>
          <Route element={<BuyerRoute isBuyer />}>
            <Route path="/my" element={<Button>my</Button>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
