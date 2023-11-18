import { createSlice } from "@reduxjs/toolkit";
import { ErrorInterface, ShipmentInterface } from "../../interfaces";

interface ShipmentState {
  shipments: ShipmentInterface[];
  shipment: ShipmentInterface | null;
  errorMessage: ErrorInterface | undefined;
  total: number;
}

const initialState: ShipmentState = {
  shipments: [],
  shipment: null,
  errorMessage: undefined,
  total: 0,
};

export const shipmentSlice = createSlice({
  name: "shipment",
  initialState,
  reducers: {
    onGetShipment: (state, { payload }) => {
      state.shipment = payload;
      state.errorMessage = undefined;
    },
    onGetShipments: (state, { payload }) => {
      state.shipments = payload.shipments;
      state.errorMessage = undefined;
      state.total = payload.total;
    },
    onNewShipment: (state, { payload }) => {
      state.shipments = [...state.shipments, payload];
    },
    onUpdateShipment: (state, { payload }) => {
      state.shipments = state.shipments.map((shipment) => {
        if (shipment.id_shipment === payload) {
          return payload;
        }
        return shipment;
      });
      state.shipment = null;
    },

    onDeleteShipment: (state, { payload }) => {
      state.shipments = state.shipments.filter(
        (shipment) => shipment.id_shipment !== payload
      );
    },
    onErrorMessageShipment: (state, { payload }) => {
      state.errorMessage = payload;
    },
    clearErrorMessageShipment: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const {
  onGetShipment,
  onGetShipments,
  onNewShipment,
  onUpdateShipment,
  onDeleteShipment,
  onErrorMessageShipment,
  clearErrorMessageShipment,
} = shipmentSlice.actions;
export default shipmentSlice.reducer;
