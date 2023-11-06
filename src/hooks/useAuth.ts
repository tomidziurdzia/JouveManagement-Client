import clientAxios from "../config/clientAxios";
import { onChecking, onLogin, onLogout } from "../store";
import { useAppDispatch } from "../store/store";
import { BusinessInterface } from "../interfaces/Business.interface";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const startLogin = async ({ email, password }: BusinessInterface) => {
    dispatch(onChecking);

    try {
      const { data } = await clientAxios.post("/business/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      dispatch(onLogin({ businessName: data.businessName, email: data.email }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(onLogout({ msg: error.response.data.msg, error: true }));
    }
  };

  return {
    startLogin,
  };
};
