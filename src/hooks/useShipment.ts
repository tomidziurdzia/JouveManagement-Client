import clientAxios from "../config/clientAxios";
import { ShipmentInterface } from "../interfaces/Shipment.interface";
import {
  onGetShipment,
  onGetShipments,
  onNewShipment,
  onUpdateShipment,
  onDeleteShipment,
  onErrorMessageShipment,
} from "../store";
import { useAppDispatch } from "../store/store";

export const useShipment = () => {
  const dispatch = useAppDispatch();

  const startNewShipment = async (shipment: ShipmentInterface) => {
    try {
      const { data } = await clientAxios.post("/shipment", shipment);
      dispatch(
        onErrorMessageShipment({
          msg: "",
          error: false,
        })
      );
      dispatch(onNewShipment(data));
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      dispatch(
        onErrorMessageShipment({
          msg: error.response.data.msg,
          error: true,
        })
      );
    }
  };

  const startGetShipment = async (shipment: ShipmentInterface) => {
    try {
      const { data } = await clientAxios(`/shipment/${shipment.id_shipment}`);
      dispatch(onGetShipment(data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(
        onErrorMessageShipment({
          msg: error.response.data.msg,
          error: true,
        })
      );
    }
  };

  const startEditShipment = async (shipment: ShipmentInterface) => {
    try {
      console.log(shipment);
      const { data } = await clientAxios.put(
        `/shipment/${shipment.id_shipment}`,
        shipment
      );
      console.log(data);
      dispatch(onUpdateShipment(data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      dispatch(
        onErrorMessageShipment({
          msg: error.response.data.msg,
          error: true,
        })
      );
    }
  };

  const startDeleteShipment = async (shipment: ShipmentInterface) => {
    try {
      await clientAxios.delete(`/shipment/${shipment.id_shipment}`);
      dispatch(onDeleteShipment(shipment.id_shipment));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(
        onErrorMessageShipment({
          msg: error.response.data.msg,
          error: true,
        })
      );
    }
  };

  const startLoadingShipments = async (page: number, size: number) => {
    try {
      const { data } = await clientAxios(`/shipment?page=${page}&size=${size}`);
      dispatch(onGetShipments(data));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    startNewShipment,
    startGetShipment,
    startEditShipment,
    startDeleteShipment,
    startLoadingShipments,
  };
};
