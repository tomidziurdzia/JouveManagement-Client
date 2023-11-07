import { Route, Routes } from "react-router-dom";
import {
  ConfirmAccount,
  ForgetPassword,
  NewPassword,
  SignIn,
  SignUp,
} from "../pages/public_pages";

const PublicRoutes = () => {
  return (
    <div className="flex w-full justify-center mt-5 md:mt-10">
      <div className="flex md:w-2/3 mx-4 md:mx-0 lg:w-1/3 flex-col justify-center p-5 md:p-10 shadow rounded-md bg-white">
        <div className="flex justify-center items-center mb-5">
          <img src="/public/logoCompleto.png" className="w-3/4" />
        </div>
        <div className="w-full">
          <div className="flex justify-center">
            {/* <Outlet /> */}
            <Routes>
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="confirm/:token" element={<ConfirmAccount />} />
              <Route path="new-password/:token" element={<NewPassword />} />
              <Route path="forget-password" element={<ForgetPassword />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PublicRoutes };
