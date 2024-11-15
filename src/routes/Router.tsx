import React, { useState, useEffect } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout/HomeLayout";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Tracking from "../pages/Tracking/Tracking";
import Account from "../pages/Account/Account";
import Product from "../pages/product/Product";
import Cart from "../pages/cart/Cart";
import Order from "../pages/order/Order";
import OrderDetails from "../pages/order/OrderDetails";
import Home from "../pages/Home/Home";
import OrderHistoryPage from "../pages/history/OrderHistory";
import withAuthGuard from "../guards/AuthGuard";
import AdminLayout from "../layout/AdminLayout/AdminLayout";

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
        <Route
          path="/cart"
          element={React.createElement(withAuthGuard(Cart))}
        />
        <Route
          path="/order"
          element={React.createElement(withAuthGuard(Order))}
        />
        <Route
          path="/orderDetail"
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
      <Route path="/admin" element={<AdminLayout />}>

      </Route>
    </Routes>
  );
}
