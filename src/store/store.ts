import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authSlice, employeeSlice } from "./";
import { vehicleSlice } from "./vehicle/vehicle.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    employee: employeeSlice.reducer,
    vehicle: vehicleSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
