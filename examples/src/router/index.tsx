import { lazy } from "react";
import { Routes, Route } from "react-router";
import App from "@/App";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const ButtonDemo = lazy(() => import("@/pages/ButtonDemo"));
const CardDemo = lazy(() => import("@/pages/CardDemo"));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path="components/button" element={<ButtonDemo />} />
        <Route path="components/card" element={<CardDemo />} />
      </Route>
    </Routes>
  );
};

export default Router;
