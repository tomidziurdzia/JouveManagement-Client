import { createSlice } from "@reduxjs/toolkit";
import { VehicleInterface, ErrorInterface } from "../../interfaces";

interface VehicleState {
  vehicles: VehicleInterface[];
  vehicle: VehicleInterface | null;
  errorMessage: ErrorInterface | undefined;
  total: number;
}

const initialState: VehicleState = {
  vehicles: [],
  vehicle: null,
  errorMessage: undefined,
  total: 0,
};

export const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    onGetVehicle: (state, { payload }) => {
      state.vehicle = payload;
      state.errorMessage = undefined;
    },
    onGetVehicles: (state, { payload }) => {
      state.vehicles = payload.vehicles;
      state.errorMessage = undefined;
      state.total = payload.total;
    },
    onNewVehicle: (state, { payload }) => {
      state.vehicles = [...state.vehicles, payload];
    },
    onUpdateVehicle: (state, { payload }) => {
      state.vehicles = state.vehicles.map((vehicle) => {
        if (vehicle.id_vehicle === payload.id) {
          return payload;
        }
        return vehicle;
      });
      state.vehicle = null;
    },

    onDeleteVehicle: (state, { payload }) => {
      state.vehicles = state.vehicles.filter(
        (vehicle) => vehicle.id_vehicle !== payload
      );
    },
    onErrorMessageVehicle: (state, { payload }) => {
      state.errorMessage = payload;
    },
    clearErrorMessageVehicle: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const {
  onGetVehicle,
  onGetVehicles,
  onNewVehicle,
  onUpdateVehicle,
  onDeleteVehicle,
  onErrorMessageVehicle,
  clearErrorMessageVehicle,
} = vehicleSlice.actions;
