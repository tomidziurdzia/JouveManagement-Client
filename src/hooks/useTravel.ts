import clientAxios from "../config/clientAxios";
import { TravelInterface } from "../interfaces";
import { useAppDispatch } from "../store/store";
import {
  onGetTravel,
  onGetTravels,
  onNewTravel,
  onUpdateTravel,
  onDeleteTravel,
  onErrorMessageTravel,
} from "../store";

export const useTravel = () => {
  const dispatch = useAppDispatch();

  const startNewTravel = async (travel: TravelInterface) => {
    const { date, semi, truck, truck_assistant, truck_driver } = travel;
    const newTravel = {
      date,
      truck,
      truck_driver,
      semi:
        typeof semi === "object" || semi === "" ? "not_semirremolque" : semi,
      truck_assistant:
        typeof truck_assistant === "object"
          ? "empty-assistant"
          : truck_assistant,
    };

    try {
      const { data } = await clientAxios.post("/travel", newTravel);
      dispatch(
        onErrorMessageTravel({
          msg: "",
          error: false,
        })
      );
      dispatch(onNewTravel(data));
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(
        onErrorMessageTravel({
          msg: error.response.data.msg,
          error: true,
        })
      );
    }
  };

  const startGetTravel = async (travel: TravelInterface) => {
    const { id_travel } = travel;
    try {
      const { data } = await clientAxios(`/travel/${id_travel}`);
      dispatch(onGetTravel(data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(
        onErrorMessageTravel({
          msg: error.response.data.msg,
          error: true,
        })
      );
    }
  };

  const startEditTravel = async (travel: TravelInterface) => {
    const valuesToEdit = {
      date: travel.date,
      truck_driver:
        typeof travel.truck_driver === "object"
          ? travel.truck_driver.id_employee
          : travel.truck_driver,
      truck_assistant:
        typeof travel.truck_assistant === "object"
          ? travel.truck_assistant.id_employee
          : travel.truck_assistant,
      truck:
        typeof travel.truck === "object"
          ? travel.truck.id_vehicle
          : travel.truck,
      semi:
        typeof travel.semi === "object" ? travel.semi.id_vehicle : travel.semi,
    };
    try {
      const { data } = await clientAxios.put(
        `/travel/${travel.id_travel}`,
        valuesToEdit
      );

      dispatch(onUpdateTravel(data));
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      dispatch(
        onErrorMessageTravel({
          msg: error.response.data.msg,
          error: true,
        })
      );
    }
  };

  const startDeleteTravel = async (travel: TravelInterface) => {
    try {
      await clientAxios.delete(`/travel/${travel.id_travel}`);
      dispatch(onDeleteTravel(travel.id_travel));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      dispatch(
        onErrorMessageTravel({
          msg: error.response.data.msg,
          error: true,
        })
      );
    }
  };

  const startLoadingTravels = async (page: number, size: number) => {
    try {
      const { data } = await clientAxios(`/travel?page=${page}&size=${size}`);
      dispatch(onGetTravels(data));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    startNewTravel,
    startGetTravel,
    startEditTravel,
    startDeleteTravel,
    startLoadingTravels,
  };
};
