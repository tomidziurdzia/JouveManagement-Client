import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { useAppSelector } from "./store/store";
import { Spinner } from "./components";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoutes, PublicRoutes } from "./layouts";

const App = () => {
  const { status } = useAppSelector((state) => state.auth);

  const { checkAuthToken } = useAuth();
  useEffect(() => {
    checkAuthToken();
  }, []);
  console.log(status);

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
            <Route path="/" element={<ProtectedRoutes />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
