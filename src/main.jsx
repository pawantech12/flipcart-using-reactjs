import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { ProductDetails } from "./pages/ProductDetails.jsx";
import { Checkout } from "./pages/Checkout.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App element={<Home />} />,
  },
  {
    path: "/product-details/:id",
    element: <App element={<ProductDetails />} />,
  },
  {
    path: "/checkout",
    element: <App element={<Checkout />} />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
