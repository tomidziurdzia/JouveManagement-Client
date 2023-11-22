import { useState } from "react";
import { TravelInterface } from "../../interfaces";
import { useTravel } from "../../hooks/useTravel";
import { ModalDeleteTravel, ModalEditTravel } from ".";
import { formatDate } from "../../helpers/formatDate";
import { useNavigate } from "react-router-dom";

interface Props {
  travel: TravelInterface;
}

const Travel = ({ travel }: Props) => {
  const [modalForm, setModalForm] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const { startGetTravel } = useTravel();
  const navigate = useNavigate();

  const handleClickEdit = async () => {
    await startGetTravel(travel);
    setModalForm(!modalForm);
  };

  const handleClickDelete = () => {
    setModalDelete(!modalDelete);
  };

  const handleClickView = async () => {
    await startGetTravel(travel);
    navigate(`/travels/${travel.id_travel}`);
  };

  return (
    <div className="flex px-4 py-2 items-center border-gray-100 border-b-2 text-lg">
      <p className="w-1/12 text-center">{formatDate(travel.date)}</p>
      <div className="w-3/12">
        <p className="w-2/3 m-auto capitalize">
          {travel.truck_driver?.lastname} {travel.truck_driver?.name}
        </p>
      </div>
      <p className="w-3/12 capitalize">
        {travel.truck_assistant?.lastname !== "-"
          ? travel.truck_assistant?.lastname +
            " " +
            travel.truck_assistant?.name
          : "-"}
      </p>
      <div className="w-2/12">
        <p className="m-auto capitalize">
          {travel.truck?.patent +
            (travel.semi?.model === "-" || travel.semi === null
              ? ""
              : "   -   " + travel.semi?.patent)}
        </p>
      </div>
      <div className="w-3/12 flex justify-center text-white gap-4">
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
      <ModalEditTravel
        travel={travel}
        modalForm={modalForm}
        setModalForm={setModalForm}
      />
      <ModalDeleteTravel
        modalDelete={modalDelete}
        setModalDelete={setModalDelete}
        travel={travel}
      />
    </div>
  );
};

export { Travel };
