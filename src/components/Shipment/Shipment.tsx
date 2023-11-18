import { useState } from "react";
import { ModalDeleteShipment, ModalEditShipment } from ".";
import { useShipment } from "../../hooks/useShipment";

interface Props {
  shipment: {
    travel: {
      date: string;
      truck: {
        patent: string;
      };
      truck_driver: {
        name: string;
        lastname: string;
      };
    };
    from: string;
    to: string;
    client: string;
  };
}

const Shipment = ({ shipment }: Props) => {
  const [modalForm, setModalForm] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const { startGetShipment } = useShipment();
  const handleClickEdit = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await startGetShipment(shipment as any);
    setModalForm(!modalForm);
  };

  const handleClickDelete = () => {
    setModalDelete(!modalDelete);
  };
  return (
    <div className="flex px-4 py-2 gap-4 text-center items-center border-gray-100 border-b-2 text-lg">
      <p className="w-1/12">{shipment.travel?.date}</p>
      <p className="w-2/12">
        {shipment.travel?.truck_driver?.lastname}{" "}
        {shipment.travel?.truck_driver?.name}
      </p>
      <p className="w-1/12">{shipment.travel?.truck?.patent}</p>
      <p className="w-2/12">{shipment.from}</p>
      <p className="w-2/12">{shipment.to}</p>
      <p className="w-3/12">{shipment.client}</p>
      <div className="w-3/12 flex justify-center text-white gap-4">
        <button className="bg-green-300 hover:opacity-60 p-2 rounded-lg shadow-sm w-full">
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
