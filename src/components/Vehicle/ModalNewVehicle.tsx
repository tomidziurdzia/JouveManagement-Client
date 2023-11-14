import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useVehicle } from "../../hooks/useVehicle";
import { VehicleInterface, ErrorInterface } from "../../interfaces";
import { onGetVehicle } from "../../store";
import { Alert } from "..";

interface Modal {
  modalForm: boolean;
  setModalForm: Dispatch<SetStateAction<boolean>>;
}

const ModalNewVehicle = ({ modalForm, setModalForm }: Modal) => {
  const dispatch = useAppDispatch();
  const { errorMessage, vehicle } = useAppSelector((state) => state.vehicle);
  const { startNewVehicle } = useVehicle();

  useEffect(() => {
    if (errorMessage) {
      setAlert({
        msg: errorMessage.msg,
        error: errorMessage.error,
      });
    }
  }, [errorMessage]);

  const [alert, setAlert] = useState<ErrorInterface>({
    msg: "",
    error: false,
  });

  const [values, setValues] = useState<VehicleInterface>({
    patent: "",
    model: "",
    typeVehicle: "",
  });

  const handleClick = () => {
    setAlert({
      msg: "",
      error: undefined,
    });
    setValues({
      patent: "",
      model: "",
      typeVehicle: "",
    });
    dispatch(onGetVehicle(null));
    setModalForm(!modalForm);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await startNewVehicle(values);
    if (data === undefined) return;

    setValues({
      patent: "",
      model: "",
      typeVehicle: "",
    });
    setModalForm(!modalForm);
    setAlert({
      msg: "",
      error: undefined,
    });
  };

  const { msg, error } = alert;

  return (
    <Transition.Root show={modalForm} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 -mt-64 md:-mt-0 overflow-y-auto"
        onClose={handleClick}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500"
                  onClick={handleClick}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-xl leading-6 font-boldtext-center font-bold text-center"
                  >
                    {vehicle?.id_vehicle ? "Edit Vehicle" : "New Vehicle"}
                  </Dialog.Title>
                  <form onSubmit={handleSubmit} className="my-10" action="">
                    <div className="mb-5">
                      <label htmlFor="patent" className="font-bold text-m">
                        Patent
                      </label>
                      <input
                        disabled={vehicle?.id_vehicle ? true : false}
                        id="patent"
                        type="text"
                        className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                        placeholder="AB213CD"
                        name="patent"
                        value={values.patent}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-5">
                      <label htmlFor="model" className="font-bold text-m">
                        Model
                      </label>
                      <input
                        id="model"
                        type="text"
                        className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                        placeholder="Mercedes Benz 1721"
                        name="model"
                        value={values.model}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-5">
                      <label htmlFor="typeVehicle" className="font-bold text-m">
                        Type Vehicle
                      </label>
                      <select
                        name="typeVehicle"
                        id="typeVehicle"
                        value={values.typeVehicle}
                        onChange={handleChange}
                        className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                      >
                        <option value="" disabled>
                          -- Select --
                        </option>
                        <option value="chasis truck">Chasis Truck</option>
                        <option value="balancin truck">Balancin Truck</option>
                        <option value="tractor">Tractor</option>
                        <option value="semirremolque">Semirremolque</option>v
                      </select>
                    </div>

                    {msg && <Alert msg={msg} error={error} />}

                    <input
                      type="submit"
                      value={
                        vehicle?.id_vehicle ? "Save Changes" : "Save Vehicle"
                      }
                      className="bg-primary text-center text-white py-2 w-full rounded hover:cursor-pointer hover:opacity-80 font-bold text-xl transition-colors"
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export { ModalNewVehicle };
