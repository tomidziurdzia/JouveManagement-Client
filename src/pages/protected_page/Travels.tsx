import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/store";
import { IoAdd } from "react-icons/io5";
import { ModalNewTravel, Travel } from "../../components/Travel";
import { useTravel } from "../../hooks/useTravel";
import { usePagination } from "../../hooks/usePagination";
import { TravelInterface } from "../../interfaces";
import { Pagination } from "../../components";

const Travels = () => {
  const [modalForm, setModalForm] = useState(false);
  const { startLoadingTravels } = useTravel();
  const { travels, travel } = useAppSelector((state) => state.travel);
  const {
    page,
    handlePrev,
    handleNext,
    itemsPerPage,
    lastPageTravels: lastPage,
  } = usePagination();

  useEffect(() => {
    startLoadingTravels(page, itemsPerPage);
  }, [travels.length, travel, page]);

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
        <ModalNewTravel modalForm={modalForm} setModalForm={setModalForm} />
        <p className="w-full text-xl">Travels List</p>
      </div>
      <div className="bg-gray-50 shadow-sm rounded-md mt-5">
        <div className="hidden lg:flex w-full text-center p-4 border-b-2 text-xl">
          <p className="w-1/12">Date</p>
          <div className="w-3/12">
            <p className="w-2/3 m-auto  text-left">Driver</p>
          </div>
          <div className="w-3/12">
            <p className="w-2/3  text-left">Assistant</p>
          </div>
          <p className="w-2/12 text-left">Vehicle</p>
          <p className="w-3/12">Actions</p>
        </div>
        <>
          {travels.length ? (
            travels.map((travel: TravelInterface) => (
              <Travel key={travel.id_travel} travel={travel} />
            ))
          ) : (
            <div className="text-center py-5 text-lg">Add a new travel</div>
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

export { Travels };
