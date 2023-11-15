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
    try {
      const { data } = await clientAxios.post("/travel", travel);
      dispatch(
        onErrorMessageTravel({
          msg: "",
          error: false,
        })
      );
      dispatch(onNewTravel(data));
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
    try {
      const { data } = await clientAxios(`/travel/${travel.id_travel}`);
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
    try {
      const { data } = await clientAxios.put(
        `/travel/${travel.id_travel}`,
        travel
      );
      dispatch(onUpdateTravel(data));
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
      console.log(data);
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
