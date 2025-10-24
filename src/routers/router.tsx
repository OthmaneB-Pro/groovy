import { createBrowserRouter } from "react-router-dom";
//@ts-ignore
import OrderPage from "@/components/pages/order/OrderPage";
import ErrorPage from "@/components/pages/error/ErrorPage";
import LoginPage from "@/components/pages/login/LoginPage";

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
