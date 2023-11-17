import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useTravel } from "../../hooks/useTravel";
import { useEmployee } from "../../hooks/useEmployee";
import { useVehicle } from "../../hooks/useVehicle";
import { ErrorInterface, TravelInterface } from "../../interfaces";
import { onGetTravel, onGetVehicle } from "../../store";
import { Dialog, Transition } from "@headlessui/react";
import { Alert } from "..";

interface Modal {
  modalForm: boolean;
  setModalForm: Dispatch<SetStateAction<boolean>>;
}

const ModalNewTravel = ({ modalForm, setModalForm }: Modal) => {
  const dispatch = useAppDispatch();
  const { errorMessage } = useAppSelector((state) => state.travel);
  const { employees } = useAppSelector((state) => state.employee);
  const { vehicles, vehicle: getVehicle } = useAppSelector(
    (state) => state.vehicle
  );
  const { startGetVehicle } = useVehicle();
  const driver = employees.filter((employee) => employee.type === "Driver");
  const assistant = employees.filter(
    (employee) => employee.type === "Assistant"
  );

  const vehicle = vehicles.filter(
    (vehicle) =>
      vehicle.typeVehicle.toLowerCase() !== "semirremolque" &&
      vehicle.id_vehicle !== "not_semirremolque"
  );

  const semirremolque = vehicles.filter(
    (vehicle) => vehicle.typeVehicle === "semirremolque".toLowerCase()
  );

  const { startNewTravel } = useTravel();
  const { startLoadingEmployees } = useEmployee();
  const { startLoadingVehicles } = useVehicle();
  const [alert, setAlert] = useState<ErrorInterface>({
    msg: "",
    error: false,
  });

  const [values, setValues] = useState<TravelInterface>({
    date: "",
    truck_driver: {
      name: "",
      lastname: "",
      cuil: "",
      password: "",
      type: "",
    },
    truck_assistant: {
      name: "",
      lastname: "",
      cuil: "",
      password: "",
      type: "",
    },
    truck: {
      patent: "",
      model: "",
      typeVehicle: "",
    },
    semi: {
      patent: "",
      model: "",
      typeVehicle: "",
    },
  });

  useEffect(() => {
    if (values.truck) {
      startGetVehicle({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        id_vehicle: values.truck as any,
        patent: "",
        model: "",
        typeVehicle: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.truck]);

  useEffect(() => {
    if (errorMessage) {
      setAlert({
        msg: errorMessage.msg,
        error: errorMessage.error,
      });
    }
  }, [errorMessage]);

  useEffect(() => {
    startLoadingEmployees(1, 100);
    startLoadingVehicles(1, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    setAlert({
      msg: "",
      error: undefined,
    });
    setValues({
      date: "",
      truck_driver: {
        name: "",
        lastname: "",
        cuil: "",
        password: "",
        type: "",
        id_employee: "",
      },
      truck_assistant: {
        name: "",
        lastname: "",
        cuil: "",
        password: "",
        type: "",
        id_employee: "",
      },
      truck: {
        patent: "",
        model: "",
        typeVehicle: "",
        id_vehicle: "",
      },
      semi: {
        patent: "",
        model: "",
        typeVehicle: "",
        id_vehicle: "",
      },
    });
    dispatch(onGetTravel(null));
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

    const data = await startNewTravel(values);
    if (data === undefined) return;

    setValues({
      date: "",
      truck_driver: {
        name: "",
        lastname: "",
        cuil: "",
        password: "",
        type: "",
      },
      truck_assistant: {
        name: "",
        lastname: "",
        cuil: "",
        password: "",
        type: "",
      },
      truck: {
        patent: "",
        model: "",
        typeVehicle: "",
      },
      semi: {
        patent: "",
        model: "",
        typeVehicle: "",
      },
    });
    setAlert({
      msg: "",
      error: undefined,
    });

    setModalForm(!modalForm);
    dispatch(onGetVehicle(null));
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
                    New Travel
                  </Dialog.Title>
                  <form onSubmit={handleSubmit} className="my-10" action="">
                    <div className="mb-5">
                      <label htmlFor="date" className="font-bold text-m">
                        Date
                      </label>
                      <input
                        id="date"
                        type="date"
                        className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                        name="date"
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        value={values.date as any}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="truck_driver"
                        className="font-bold text-m"
                      >
                        Driver
                      </label>
                      <select
                        name="truck_driver"
                        id="truck_driver"
                        value={values.truck_driver?.toString()}
                        onChange={handleChange}
                        className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                      >
                        <option value="">-- Select --</option>
                        {driver.map((driver) => (
                          <option
                            key={driver.id_employee}
                            value={driver.id_employee}
                          >
                            {driver.lastname} {driver.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="truck_assistant"
                        className="font-bold text-m"
                      >
                        Assistant
                      </label>
                      <select
                        name="truck_assistant"
                        id="truck_assistant"
                        value={values.truck_assistant?.toString()}
                        onChange={handleChange}
                        className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                      >
                        <option value="">-- Select --</option>
                        {assistant?.map((assistant) => (
                          <option
                            key={assistant.id_employee}
                            value={assistant.id_employee}
                          >
                            {assistant.lastname} {assistant.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-5">
                      <label htmlFor="truck" className="font-bold text-m">
                        Truck
                      </label>
                      <select
                        name="truck"
                        id="truck"
                        value={values.truck?.toString()}
                        onChange={handleChange}
                        className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                      >
                        <option value="">-- Select --</option>
                        {vehicle?.map((vehicle) => (
                          <option
                            key={vehicle.id_vehicle}
                            value={vehicle.id_vehicle}
                          >
                            {vehicle.typeVehicle.replace(/\b\w/g, (match) =>
                              match.toUpperCase()
                            )}{" "}
                            {vehicle.patent} {vehicle.model}
                          </option>
                        ))}
                      </select>
                    </div>

                    {getVehicle?.typeVehicle === "Tractor".toLowerCase() && (
                      <div className="mb-5">
                        <label htmlFor="semi" className="font-bold text-m">
                          Semirremolque
                        </label>
                        <select
                          name="semi"
                          id="semi"
                          value={values.semi?.toString()}
                          onChange={handleChange}
                          className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                        >
                          <option value="">-- Select --</option>
                          {semirremolque.map((semirremolque) => (
                            <option
                              key={semirremolque.id_vehicle}
                              value={semirremolque.id_vehicle}
                            >
                              {semirremolque.patent} {semirremolque.model}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    {msg && <Alert msg={msg} error={error} />}

                    <input
                      type="submit"
                      value="Save Travel"
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

export { ModalNewTravel };
