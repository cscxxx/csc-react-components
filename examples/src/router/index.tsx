import { Routes, Route } from "react-router";
import App from "@/App";
import Dashboard from "@/pages/Dashboard";
import ButtonDemo from "@/pages/ButtonDemo";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path="components/button" element={<ButtonDemo />} />
      </Route>
    </Routes>
  );
};

export default Router;
