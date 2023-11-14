import clientAxios from "../config/clientAxios";
import { VehicleInterface } from "../interfaces";
import { useAppDispatch } from "../store/store";
import {
  onGetVehicle,
  onGetVehicles,
  onNewVehicle,
  onUpdateVehicle,
  onDeleteVehicle,
  onErrorMessageVehicle,
} from "../store";

export const useVehicle = () => {
  const dispatch = useAppDispatch();

  const startNewVehicle = async (vehicle: VehicleInterface) => {
    try {
      const { data } = await clientAxios.post("/vehicle", vehicle);
      dispatch(
        onErrorMessageVehicle({
          msg: "",
          error: false,
        })
      );
      dispatch(onNewVehicle(data));
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(
        onErrorMessageVehicle({
          msg: error.response.data.msg,
          error: true,
        })
      );
    }
  };

  const startGetVehicle = async (vehicle: VehicleInterface) => {
    try {
      const { data } = await clientAxios(`/vehicle/${vehicle.id_vehicle}`);
      dispatch(onGetVehicle(data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(
        onErrorMessageVehicle({
          msg: error.response.data.msg,
          error: true,
        })
      );
    }
  };

  const startEditVehicle = async (vehicle: VehicleInterface) => {
    try {
      const { data } = await clientAxios.put(
        `/vehicle/${vehicle.id_vehicle}`,
        vehicle
      );
      dispatch(onUpdateVehicle(data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      dispatch(
        onErrorMessageVehicle({
          msg: error.response.data.msg,
          error: true,
        })
      );
    }
  };

  const startDeleteVehicle = async (vehicle: VehicleInterface) => {
    try {
      await clientAxios.delete(`/vehicle/${vehicle.id_vehicle}`);
      dispatch(onDeleteVehicle(vehicle.id_vehicle));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      dispatch(
        onErrorMessageVehicle({
          msg: error.response.data.msg,
          error: true,
        })
      );
    }
  };

  const startLoadingVehicles = async (page: number, size: number) => {
    try {
      const { data } = await clientAxios(`/vehicle?page=${page}&size=${size}`);
      dispatch(onGetVehicles(data));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    startNewVehicle,
    startGetVehicle,
    startEditVehicle,
    startDeleteVehicle,
    startLoadingVehicles,
  };
};
