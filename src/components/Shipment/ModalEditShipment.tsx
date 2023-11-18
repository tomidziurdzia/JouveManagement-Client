import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useTravel } from "../../hooks/useTravel";
import { useShipment } from "../../hooks/useShipment";
import { ErrorInterface, ShipmentInterface } from "../../interfaces";
import { Alert } from "..";
import { onGetTravel, onGetVehicle } from "../../store";

interface Modal {
  modalForm: boolean;
  setModalForm: Dispatch<SetStateAction<boolean>>;
  shipment: ShipmentInterface;
}

const ModalEditShipment = ({ modalForm, setModalForm, shipment }: Modal) => {
  const dispatch = useAppDispatch();
  const { errorMessage } = useAppSelector((state) => state.shipment);
  const { travels } = useAppSelector((state) => state.travel);
  const { startEditShipment, startLoadingShipments } = useShipment();
  const { startLoadingTravels } = useTravel();

  const [alert, setAlert] = useState<ErrorInterface>({
    msg: "",
    error: false,
  });

  const [values, setValues] = useState<ShipmentInterface>({
    id_shipment: "",
    id_travel: "",
    from: "",
    to: "",
    client: "",
    description: "",
    delivered: false,
    travel: {
      date: "",
      truck: { patent: "" },
      truck_driver: { name: "", lastname: "" },
    },
  });

  useEffect(() => {
    if (errorMessage) {
      setAlert({
        msg: errorMessage.msg,
        error: errorMessage.error,
      });
    }
  }, [errorMessage]);

  useEffect(() => {
    startLoadingShipments(1, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (shipment?.id_shipment) {
      setValues({
        id_shipment: shipment.id_shipment,
        from: shipment.from,
        to: shipment.to,
        client: shipment.client,
        description: shipment.description,
        delivered: false,
        travel: {
          date: shipment.travel?.date || "",
          truck: { patent: shipment.travel?.truck.patent || "" },
          truck_driver: {
            name: shipment.travel?.truck_driver.name || "",
            lastname: shipment.travel?.truck_driver.lastname || "",
          },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalForm]);

  const handleClick = () => {
    setAlert({
      msg: "",
      error: undefined,
    });
    setValues({
      id_travel: "",
      from: "",
      to: "",
      client: "",
      description: "",
      delivered: false,
    });
    dispatch(onGetTravel(null));
    dispatch(onGetVehicle(null));
    setModalForm(!modalForm);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await Promise.all([
      startEditShipment(values),
      startLoadingTravels(1, 1000),
    ]);
    setValues({
      id_shipment: "",
      id_travel: "",
      from: "",
      to: "",
      client: "",
      description: "",
      delivered: false,
      travel: {
        date: "",
        truck: { patent: "" },
        truck_driver: { name: "", lastname: "" },
      },
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
                    New Shipment
                  </Dialog.Title>
                  <form onSubmit={handleSubmit} className="my-10" action="">
                    <div className="mb-5">
                      <label htmlFor="id_travel" className="font-bold text-m">
                        Travel
                      </label>
                      <select
                        name="id_travel"
                        id="id_travel"
                        value={values.id_travel?.toString()}
                        onChange={handleChange}
                        className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                      >
                        <option value="">-- Select --</option>
                        {travels.map((travel) => (
                          <option
                            key={travel.id_travel}
                            value={travel.id_travel}
                          >
                            {travel.date} - {travel.truck_driver?.name}{" "}
                            {travel.truck_driver?.lastname}{" "}
                            {travel.truck_assistant.id_employee ===
                            "empty-assistant"
                              ? ""
                              : `- ${travel.truck_assistant?.name}
                            ${travel.truck_assistant?.lastname} `}{" "}
                            {" - " + travel.truck?.patent}
                            {travel.semi.id_vehicle === "not_semirremolque"
                              ? ""
                              : `- ${travel.semi.patent}`}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-5">
                      <label htmlFor="from" className="font-bold text-m">
                        From
                      </label>
                      <input
                        id="from"
                        type="text"
                        className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                        placeholder="Calle falsa 123"
                        name="from"
                        value={values.from}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-5">
                      <label htmlFor="to" className="font-bold text-m">
                        To
                      </label>
                      <input
                        id="to"
                        type="text"
                        className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                        placeholder="Calle falsa 123"
                        name="to"
                        value={values.to}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-5">
                      <label htmlFor="client" className="font-bold text-m">
                        Client
                      </label>
                      <input
                        id="client"
                        type="text"
                        className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                        placeholder="Lacteos Conosur"
                        name="client"
                        value={values.client}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-5">
                      <label htmlFor="description" className="font-bold text-m">
                        Description
                      </label>
                      <textarea
                        id="description"
                        className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                        placeholder="12 Pallets de leche descremada"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        rows={3}
                      ></textarea>
                    </div>

                    {msg && <Alert msg={msg} error={error} />}

                    <input
                      type="submit"
                      value="Save Shipment"
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

export { ModalEditShipment };
