import "./App.css";
import { NavBar } from "./Components/Navbar";
import { RegistrationForm } from "./Components/RegistrationForm";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SigninPage } from "./pages/SigninPage";
import { RegisterPage } from "./pages/RegisterPage";

import { HomePage } from "./pages/HomePage";
import { CartPage } from "./pages/CartPage";
import { ItemPage } from "./pages/ItemPage";
import { AddProducts } from "./pages/AddProductsPage";

import { NotFound } from "./pages/NotFound";
import { StoreAdminDashboard } from "./pages/StoreAdminDashboard";
import { EditProductPage } from "./pages/EditProductsPage"
import { EditProduct } from "./pages/EditProduct";
import { OrderSummaryPage } from "./pages/OrderSummaryStoreAdmin";
import { EditProfilePage } from "./pages/EditProfilePage";
import { OrderHistory } from "./pages/OrderHistoryUser";
import { MainAdminDashboard } from "./pages/MainAdminDashboard";
import ViewStores from "./pages/ViewStores";
import ViewUsers from "./pages/ViewUsers";
import { ForgotPasswordPage } from "./pages/ForgotPassword";
import Footer from "./pages/Footer";
function App() {
  return (
    <div>
      {/* <NavBar />
      <RegistrationForm /> */}

      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/storeadmindash" element={<StoreAdminDashboard />} />

          <Route path="/home" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="/addproducts" element={<AddProducts />} />
          <Route path="/editproductpage" element={<EditProductPage />} />
          <Route path="/editproducts/:id" element={<EditProduct />} />
          <Route path="/ordersummary" element={<OrderSummaryPage />} />

          <Route path="/profile" element={<EditProfilePage />} />

          <Route path="/orderhistory" element={<OrderHistory />} />

          <Route path="/mainadmindashboard" element={<MainAdminDashboard />} />
          <Route path="/viewstores" element={<ViewStores />} />
          <Route path="/viewusers" element={<ViewUsers />} />

          <Route path="/forgotpassword" element={<ForgotPasswordPage/>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;








//todo 
// storeAdmin dashboard 
// storeAdmin products (edit page)
// storeAdmin add product form 