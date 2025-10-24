import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "@/components/pages/error/ErrorPage";
import LoginPage from "@/components/pages/login/LoginPage";
import OrderPage from "@/components/pages/order/OrderPage";

const routes = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/order/:username",
    element: <OrderPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

export const router = createBrowserRouter(routes);
