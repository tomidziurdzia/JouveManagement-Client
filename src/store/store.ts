import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authSlice, employeeSlice, vehicleSlice, travelSlice } from "./";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    employee: employeeSlice.reducer,
    vehicle: vehicleSlice.reducer,
    travel: travelSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
