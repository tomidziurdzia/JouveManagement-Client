import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { useAppSelector } from "./store/store";
import { Spinner } from "./components";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoutes, PublicRoutes } from "./layouts";
import {
  Employees,
  Shipments,
  Travels,
  Vehicles,
  Dashboard,
} from "./pages/protected_page";
import { ViewEmployee } from "./components/Employee";
import { ViewVehicle } from "./components/Vehicle";

const App = () => {
  const { status } = useAppSelector((state) => state.auth);

  const { checkAuthToken } = useAuth();
  useEffect(() => {
    checkAuthToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "checking") {
    return <Spinner />;
  }
  return (
    <BrowserRouter>
      <Routes>
        {status === "not-authenticated" ? (
          <>
            <Route path="/auth/*" element={<PublicRoutes />} />
            <Route path="/*" element={<Navigate to="/auth/signin" />} />
          </>
        ) : (
          <>
            <Route path="/*" element={<Navigate to="/" />} />
            <Route path="/" element={<ProtectedRoutes />}>
              <Route index element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="employees/:id" element={<ViewEmployee />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/vehicles/:id" element={<ViewVehicle />} />
              <Route path="/travels" element={<Travels />} />
              <Route path="/shipments" element={<Shipments />} />
            </Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
