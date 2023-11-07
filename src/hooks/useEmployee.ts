import clientAxios from "../config/clientAxios";
import { EmployeeInterface } from "../interfaces";
import { onNewEmployee, onErrorMessage, onGetEmployees } from "../store";

import { useAppDispatch } from "../store/store";

export const useEmployee = () => {
  const dispatch = useAppDispatch();

  const startNewEmployee = async (employee: EmployeeInterface) => {
    try {
      const { data } = await clientAxios.post("/employee", employee);
      dispatch(
        onErrorMessage({
          msg: "",
          error: false,
        })
      );
      dispatch(onNewEmployee(data));
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(
        onErrorMessage({
          msg: error.response.data.msg,
          error: true,
        })
      );
    }
  };

  const startLoadingEmployees = async () => {
    try {
      const { data } = await clientAxios("/employee");
      console.log(data);
      dispatch(onGetEmployees(data));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    startNewEmployee,
    startLoadingEmployees,
  };
};
