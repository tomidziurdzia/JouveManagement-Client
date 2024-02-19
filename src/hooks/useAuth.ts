import clientAxios from "../config/clientAxios";
import { onChecking, onLogin, onLogout } from "../store";
import { useAppDispatch } from "../store/store";
import { BusinessInterface } from "../interfaces";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const startLogin = async ({ email, password }: BusinessInterface) => {
    dispatch(onChecking);

    console.log("hola");

    try {
      const { data } = await clientAxios.post("/auth/login", {
        email,
        password,
      });

      const res = await clientAxios.post("/auth/login", {
        email,
        password,
      });

      console.log(res);

      localStorage.setItem("token", data.token);
      dispatch(onLogin({ businessName: data.businessName, email: data.email }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(onLogout({ msg: error.response.data.msg, error: true }));
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout(undefined));

    try {
      const { data } = await clientAxios("/auth");
      localStorage.setItem("token", data.token);
      dispatch(onLogin({ businessName: data.businessName, email: data.email }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(onLogout({ msg: error.response.data.msg, error: true }));
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout(undefined));
  };

  return {
    startLogin,
    checkAuthToken,
    startLogout,
  };
};
