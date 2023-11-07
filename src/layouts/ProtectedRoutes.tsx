import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages";

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
};

export { ProtectedRoutes };
