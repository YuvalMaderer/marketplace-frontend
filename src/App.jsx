import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductPage from "./components/ProductPage";
import ProductDetailPage from "./components/ProductDetailPage";

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Products" element={<ProductPage />} />
        <Route path="/Products/:productId" element={<ProductDetailPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
