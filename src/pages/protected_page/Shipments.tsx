import { useEffect, useState } from "react";
import { useShipment } from "../../hooks/useShipment";
import { useAppSelector } from "../../store/store";
import { usePagination } from "../../hooks/usePagination";
import { IoAdd } from "react-icons/io5";
import { Pagination } from "../../components";
import { ModalNewShipment, Shipment } from "../../components/Shipment";

const Shipments = () => {
  const [modalForm, setModalForm] = useState(false);
  const { startLoadingShipments } = useShipment();
  const { shipments, shipment } = useAppSelector((state) => state.shipment);
  const {
    page,
    handlePrev,
    handleNext,
    itemsPerPage,
    lastPageShipments: lastPage,
  } = usePagination();

  useEffect(() => {
    startLoadingShipments(page, itemsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shipments.length, shipment, page]);

  const handleClick = () => {
    setModalForm(!modalForm);
  };
  return (
    <div className="p-4">
      <div className="flex items-center gap-10">
        <button
          onClick={handleClick}
          className="bg-primary mr-4 text-white text-3xl p-1 flex justify-center items-center rounded-full hover:opacity-80 hover:transition-colors"
        >
          <IoAdd />
        </button>
        <ModalNewShipment modalForm={modalForm} setModalForm={setModalForm} />
        <p className="w-full text-xl">Shipments List</p>
      </div>
      <div className="bg-gray-50 shadow-sm rounded-md mt-5">
        <div className="hidden lg:flex w-full text-center p-4 border-b-2 text-xl">
          <p className="w-1/12">Date</p>
          <p className="w-2/12">Driver</p>
          <p className="w-1/12">Vehicle</p>
          <p className="w-2/12">From</p>
          <p className="w-2/12">To</p>
          <p className="w-2/12">Client</p>
          <p className="w-2/12 text-center">Action</p>
        </div>
        <>
          {shipments.length ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            shipments.map((shipment: any) => (
              <Shipment key={shipment.id_shipment} shipment={shipment} />
            ))
          ) : (
            <div className="text-center py-5 text-lg">Add a new shipment</div>
          )}
        </>
      </div>
      <Pagination
        handlePrev={handlePrev}
        handleNext={handleNext}
        page={page}
        lastPage={lastPage}
      />
    </div>
  );
};

export { Shipments };
