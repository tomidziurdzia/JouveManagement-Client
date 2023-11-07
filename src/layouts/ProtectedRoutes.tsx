import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "../components";

const ProtectedRoutes = () => {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="flex">
        <div className="w-2/12">
          <Sidebar />
        </div>
        <div className="w-10/12 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export { ProtectedRoutes };
