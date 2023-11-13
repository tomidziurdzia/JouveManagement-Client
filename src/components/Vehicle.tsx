import { useState } from "react";
import { VehicleInterface } from "../interfaces";
import { useVehicle } from "../hooks/useVehicle";
import { IoCarOutline } from "react-icons/io5";
import { ModalDelete, ModalVehicleForm } from ".";

interface Props {
  vehicle: VehicleInterface;
}

const Vehicle = ({ vehicle }: Props) => {
  const [modalForm, setModalForm] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const { startGetVehicle } = useVehicle();
  const handleClickEdit = async () => {
    await startGetVehicle(vehicle);
    setModalForm(!modalForm);
  };

  const handleClickDelete = () => {
    setModalDelete(!modalDelete);
  };
  return (
    <div className="flex px-4 py-2 items-center border-gray-100 border-b-2 text-lg">
      <div className="w-2/12">
        <p className="w-1/2 m-auto flex text-8xl">
          {vehicle.picture === null ? <IoCarOutline /> : vehicle.picture}
        </p>
      </div>
      <p className="w-2/12 capitalize">{vehicle.patent}</p>
      <p className="w-3/12 capitalize">{vehicle.model}</p>

      <div className="w-2/12">
        <p className="m-auto capitalize">{vehicle.typeVehicle}</p>
      </div>
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
      <ModalVehicleForm modalForm={modalForm} setModalForm={setModalForm} />
      <ModalDelete
        modalDelete={modalDelete}
        setModalDelete={setModalDelete}
        vehicle={vehicle}
      />
    </div>
  );
};

export { Vehicle };
