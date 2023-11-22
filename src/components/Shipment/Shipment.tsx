import { useState } from "react";
import { ModalDeleteShipment, ModalEditShipment } from ".";
import { useShipment } from "../../hooks/useShipment";
import { formatDate } from "../../helpers/formatDate";
import { useNavigate } from "react-router-dom";
import { ShipmentInterface } from "../../interfaces";

interface Props {
  shipment: ShipmentInterface;
}

const Shipment = ({ shipment }: Props) => {
  const [modalForm, setModalForm] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const navigate = useNavigate();

  const { startGetShipment } = useShipment();
  const handleClickEdit = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await startGetShipment(shipment as any);
    setModalForm(!modalForm);
  };

  const handleClickDelete = () => {
    setModalDelete(!modalDelete);
  };

  const handleClickView = async () => {
    await startGetShipment(shipment);
    navigate(`/shipments/${shipment.id_shipment}`);
  };

  return (
    <div className="flex px-4 py-2 gap-4 text-center items-center border-gray-100 border-b-2 text-lg">
      <p className="w-1/12">{formatDate(shipment.travel?.date as string)}</p>
      <p className="w-2/12">
        {shipment.travel?.truck_driver?.lastname}{" "}
        {shipment.travel?.truck_driver?.name}
      </p>
      <p className="w-1/12">{shipment.travel?.truck?.patent}</p>
      <p className="w-2/12">{shipment.from}</p>
      <p className="w-2/12">{shipment.to}</p>
      <p className="w-2/12">{shipment.client}</p>
      <div className="w-2/12 flex justify-center text-white gap-4">
        <button
          onClick={handleClickView}
          className="bg-green-300 hover:opacity-60 p-2 rounded-lg shadow-sm w-full"
        >
          View
        </button>
        <button
          onClick={handleClickEdit}
          className="bg-gray-300 hover:opacity-60 p-2 rounded-lg shadow-sm w-full"
        >
          Edit
        </button>
        <button
          onClick={handleClickDelete}
          className="bg-red-300 hover:opacity-80 p-2 rounded-lg shadow-sm w-full"
        >
          Delete
        </button>
      </div>
      <ModalEditShipment
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        shipment={shipment as any}
        modalForm={modalForm}
        setModalForm={setModalForm}
      />
      <ModalDeleteShipment
        modalDelete={modalDelete}
        setModalDelete={setModalDelete}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        shipment={shipment as any}
      />
    </div>
  );
};

export { Shipment };
