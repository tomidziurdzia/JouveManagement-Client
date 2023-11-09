import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { EmployeeInterface, ErrorInterface } from "../interfaces";
import { useEmployee } from "../hooks/useEmployee";
import { Alert } from "./";
import { onGetEmployee } from "../store";

interface Modal {
  modalForm: boolean;
  setModalForm: Dispatch<SetStateAction<boolean>>;
}

const ModalEmployeeForm = ({ modalForm, setModalForm }: Modal) => {
  const dispatch = useAppDispatch();
  const { employee } = useAppSelector((state) => state.employee);
  const { errorMessage } = useAppSelector((state) => state.employee);
  const { startNewEmployee, startEditEmployee, startLoadingEmployees } =
    useEmployee();

  useEffect(() => {
    if (errorMessage) {
      setAlert({
        msg: errorMessage.msg,
        error: errorMessage.error,
      });
    }
  }, [errorMessage]);

  useEffect(() => {
    if (employee?.id_employee) {
      setValues({
        name: employee.name,
        lastname: employee.lastname,
        password: employee.password,
        type: employee.type,
        cuil: employee.cuil,
        id_employee: employee.id_employee,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalForm]);

  const [alert, setAlert] = useState<ErrorInterface>({
    msg: "",
    error: false,
  });

  const [values, setValues] = useState<EmployeeInterface>({
    name: "",
    lastname: "",
    cuil: "",
    password: "",
    type: "",
  });

  const handleClick = () => {
    setAlert({
      msg: "",
      error: undefined,
    });
    setValues({
      name: "",
      lastname: "",
      cuil: "",
      password: "",
      type: "",
    });
    setModalForm(!modalForm);
    dispatch(onGetEmployee(null));
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

    let data;
    if (employee?.id_employee) {
      data = await startEditEmployee(values);
      await startLoadingEmployees();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    } else {
      data = await startNewEmployee(values);
      if (data === undefined) return;
    }

    setValues({
      name: "",
      lastname: "",
      cuil: "",
      password: "",
      type: "",
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
                    {employee?.id_employee ? "Edit Employee" : "New Employee"}
                  </Dialog.Title>
                  <form onSubmit={handleSubmit} className="my-10" action="">
                    <div className="mb-5">
                      <label htmlFor="name" className="font-bold text-m">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                        placeholder="Tomas"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-5">
                      <label htmlFor="lastname" className="font-bold text-m">
                        Lastname
                      </label>
                      <input
                        id="lastname"
                        type="text"
                        className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                        placeholder="Dziurdzia"
                        name="lastname"
                        value={values.lastname}
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      className={`"mb-5" ${
                        employee?.id_employee ? "hidden" : ""
                      }`}
                    >
                      <label htmlFor="cuil" className="font-bold text-m">
                        Cuil
                      </label>
                      <input
                        id="cuil"
                        type="text"
                        className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                        placeholder="20379143688"
                        name="cuil"
                        value={values.cuil}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-5">
                      <label htmlFor="password" className="font-bold text-m">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                        placeholder="**********"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-5">
                      <label htmlFor="type" className="font-bold text-m">
                        Type
                      </label>
                      <select
                        name="type"
                        id="type"
                        value={values.type}
                        onChange={handleChange}
                        className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                      >
                        <option value="" disabled>
                          -- Select --
                        </option>
                        <option value="driver">Driver</option>
                        <option value="assistant">Assistant</option>
                        <option value="administrative">Administrative</option>
                      </select>
                    </div>

                    {msg && <Alert msg={msg} error={error} />}

                    <input
                      type="submit"
                      value={
                        employee?.id_employee ? "Save Changes" : "Save Employee"
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

export { ModalEmployeeForm };
