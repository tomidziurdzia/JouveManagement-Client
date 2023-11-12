import { createSlice } from "@reduxjs/toolkit";
import { EmployeeInterface, ErrorInterface } from "../../interfaces";

interface EmployeeState {
  employees: EmployeeInterface[];
  employee: EmployeeInterface | null;
  errorMessage: ErrorInterface | undefined;
}

const initialState: EmployeeState = {
  employees: [],
  employee: null,
  errorMessage: undefined,
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    onGetEmployee: (state, { payload }) => {
      state.employee = payload;
      state.errorMessage = undefined;
    },
    onGetEmployees: (state, { payload }) => {
      state.employees = payload;
      state.errorMessage = undefined;
    },
    onNewEmployee: (state, { payload }) => {
      state.employees = [...state.employees, payload];
    },
    onUpdateEmployee: (state, { payload }) => {
      state.employees = state.employees.map((employe) => {
        if (employe.id_employee === payload.id) {
          return payload;
        }
        return employe;
      });
    },
    onDeleteEmployee: (state, { payload }) => {
      state.employees = state.employees.filter(
        (employee) => employee.id_employee !== payload
      );
    },
    onErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
    },
    clearErrorMessageEmployee: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const {
  onGetEmployee,
  onGetEmployees,
  onNewEmployee,
  onUpdateEmployee,
  onDeleteEmployee,
  onErrorMessage,
  clearErrorMessageEmployee,
} = employeeSlice.actions;
