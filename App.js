import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from "./components/pages/Home";
import MyAccount from './components/pages/MyAccount';
import Register from './components/pages/Register';
import Login from "./components/pages/Login";
import AdminHome from './components/pages/AdminHome';
import UserInfo from './components/pages/UserInfo';
import Addresses from './components/pages/Addresses';
import AdminProducts from './components/pages/AdminProducts';
import Reviews from './components/pages/Reviews';
import ProductPage from './components/pages/ProductPage';
import AddProduct from './components/pages/AddProduct';
import Cart from './components/pages/Cart';
import Orders from './components/pages/Orders';
import OrderPage from './components/pages/OrderPage';
import ProductStatistics from './components/pages/ProductStatistics';
import UserStatistics from './components/pages/UserStatistics';
import ReviewStatistics from './components/pages/ReviewStatistics';

function App() {

  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/addresses" element={<Addresses />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/user/order/:id" element={<OrderPage />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/adminproducts" element={<AdminProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/productstatistics" element={<ProductStatistics />} />
          <Route path="/userstatistics" element={<UserStatistics />} />
          <Route path="/reviewstatistics" element={<ReviewStatistics />} />
        </Routes>
    </div>
  );
}

export default App;
