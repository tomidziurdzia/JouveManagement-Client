import clientAxios from "../config/clientAxios";
import { EmployeeInterface } from "../interfaces";
import {
  onNewEmployee,
  onErrorMessage,
  onGetEmployees,
  onGetEmployee,
  onUpdateEmployee,
  onDeleteEmployee,
} from "../store";

import { useAppDispatch } from "../store/store";

export const useEmployee = () => {
  const dispatch = useAppDispatch();

  const startNewEmployee = async (employee: EmployeeInterface) => {
    console.log(employee);
    try {
      const { data } = await clientAxios.post("/employee", employee);
      console.log(data);
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
      console.log(error);
      dispatch(
        onErrorMessage({
          msg: error.response.data.msg,
          error: true,
        })
      );
    }
  };

  const startGetEmployee = async (employee: EmployeeInterface) => {
    try {
      const { data } = await clientAxios(`/employee/${employee.id_employee}`);
      dispatch(onGetEmployee(data));

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

  const startEditEmployee = async (employee: EmployeeInterface) => {
    try {
      const { data } = await clientAxios.put(
        `/employee/${employee?.id_employee}`,
        employee
      );

      dispatch(onUpdateEmployee(data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      dispatch(
        onErrorMessage({
          msg: error.response.data.msg,
          error: true,
        })
      );
    }
  };

  const startDeleteEmployee = async (employee: EmployeeInterface) => {
    try {
      await clientAxios.delete(`/employee/${employee.id_employee}`);
      dispatch(onDeleteEmployee(employee.id_employee));
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

  const startLoadingEmployees = async (page: number, size: number) => {
    try {
      // const { data } = await clientAxios("/employee");
      const { data } = await clientAxios.get(
        `/employee?page=${page}&size=${size}`
      );

      dispatch(onGetEmployees(data));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    startNewEmployee,
    startGetEmployee,
    startEditEmployee,
    startDeleteEmployee,
    startLoadingEmployees,
  };
};
