import React, { useState, useEffect } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout/HomeLayout";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Account from "../pages/Account/Account";
import Product from "../pages/product/Product";
import Cart from "../pages/cart/Cart";
import Order from "../pages/order/Order";
import OrderDetails from "../pages/order/OrderDetails";
import Home from "../pages/Home/Home";
import OrderHistoryPage from "../pages/history/OrderHistory";
import withAuthGuard from "../guards/AuthGuard";
import AdminLayout from "../layout/AdminLayout/AdminLayout";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Products from "../pages/Admin/Product/Products";
import AddProduct from "../pages/Admin/Product/AddProduct/AddProduct";
import UpdateProduct from "../pages/Admin/Product/UpdateProduct/UpdateProduct";
import Users from "../pages/Admin/User/Users";
import AddUser from "../pages/Admin/User/AddUser/AddUser";
import UpdateUser from "../pages/Admin/User/UpdateUser/UpdateUser";
import Orders from "../pages/Admin/Order/Order";
import UpdateOrder from "../pages/Admin/Order/UpdateOrder/UpdateOrder";
import StatisticsPage from "../pages/Admin/Statistics/Statistics";
import withAdminGuard from "../guards/AdminGuard";
import Payment from "../pages/Payment/Payment";

export default function Router() {
  const [isCartVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === "/cart") {
      setIsCartVisible(true);
    } else {
      setIsCartVisible(false);
    }

    // eslint-disable-next-line no-restricted-globals
  }, [location.pathname]);
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/product-detail/:productId"
          element={React.createElement(withAuthGuard(ProductDetail))}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/payment/:orderId"
          element={React.createElement(withAuthGuard(Payment))}
        />
        <Route
          path="/cart"
          element={React.createElement(withAuthGuard(Cart))}
        />
        <Route
          path="/order"
          element={React.createElement(withAuthGuard(Order))}
        />
        <Route
          path="/orderDetail/:orderId"
          element={React.createElement(withAuthGuard(OrderDetails))}
        />
        <Route
          path="/account"
          element={React.createElement(withAuthGuard(Account))}
        />
        <Route
          path="/order-history"
          element={React.createElement(withAuthGuard(OrderHistoryPage))}
        />
        <Route
          path="/product"
          element={React.createElement(withAuthGuard(Product))}
        />
      </Route>

      <Route path="/admin" element={React.createElement(withAdminGuard(AdminLayout))}>
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/addProduct" element={<AddProduct />} />
        <Route path="/admin/updateProduct/:id" element={<UpdateProduct />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/addUser" element={<AddUser />} />
        <Route path="/admin/updateUser/:userId" element={<UpdateUser />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/updateOrder/:id" element={<UpdateOrder />} />
        <Route path="/admin/statistics" element={<StatisticsPage />} />

      </Route>
    </Routes>
  );
}
