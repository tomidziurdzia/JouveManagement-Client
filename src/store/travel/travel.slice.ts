import { createSlice } from "@reduxjs/toolkit";
import { ErrorInterface, TravelInterface } from "../../interfaces";

interface TravelState {
  travels: TravelInterface[];
  travel: TravelInterface | null;
  errorMessage: ErrorInterface | undefined;
  total: number;
}

const initialState: TravelState = {
  travels: [],
  travel: null,
  errorMessage: undefined,
  total: 0,
};

export const travelSlice = createSlice({
  name: "travel",
  initialState,
  reducers: {
    onGetTravel: (state, { payload }) => {
      state.travel = payload;
      state.errorMessage = undefined;
    },
    onGetTravels: (state, { payload }) => {
      state.travels = payload.travels;
      state.errorMessage = undefined;
      state.total = payload.total;
    },
    onNewTravel: (state, { payload }) => {
      state.travels = [...state.travels, payload];
    },
    onUpdateTravel: (state, { payload }) => {
      state.travels = state.travels.map((travel) => {
        if (travel.id_travel === payload._id) {
          return payload;
        }
        return travel;
      });
      state.travel = null;
    },

    onDeleteTravel: (state, { payload }) => {
      state.travels = state.travels.filter(
        (travel) => travel.id_travel !== payload
      );
    },
    onErrorMessageTravel: (state, { payload }) => {
      state.errorMessage = payload;
    },
    clearErrorMessageTravel: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const {
  onGetTravel,
  onGetTravels,
  onNewTravel,
  onUpdateTravel,
  onDeleteTravel,
  onErrorMessageTravel,
  clearErrorMessageTravel,
} = travelSlice.actions;
