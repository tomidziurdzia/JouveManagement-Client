import { IoPersonOutline } from "react-icons/io5";
import { EmployeeInterface } from "../../interfaces";
import { useEmployee } from "../../hooks/useEmployee";
import { useState } from "react";
import { ModalDeleteEmployee, ModalEditEmployee } from "./";
import { useNavigate } from "react-router-dom";

interface Props {
  employee: EmployeeInterface;
}

const Employee = ({ employee }: Props) => {
  const [modalForm, setModalForm] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const { startGetEmployee } = useEmployee();
  const navigate = useNavigate();

  const handleClickEdit = async () => {
    await startGetEmployee(employee);
    setModalForm(!modalForm);
  };

  const handleClickDelete = async () => {
    setModalDelete(!modalDelete);
  };

  const handleClickView = async () => {
    await startGetEmployee(employee);
    navigate(`/employees/${employee.id_employee}`);
  };

  return (
    <div className="flex px-4 py-2 items-center border-gray-100 border-b-2 text-lg">
      <div className="w-1/12">
        <p className="w-1/2 m-auto flex text-8xl">
          {employee.picture === null ? <IoPersonOutline /> : employee.picture}
        </p>
      </div>
      <div className="w-5/12">
        <p className="w-1/3 m-auto capitalize">
          {employee.lastname} {employee.name}
        </p>
      </div>

      <div className="w-3/12">
        <p className="w-1/3 m-auto capitalize">{employee.type}</p>
      </div>
      <div className="w-3/12 flex justify-center text-white gap-4">
        <button
          onClick={handleClickView}
          className="bg-green-200 hover:bg-green-300 transition-colors p-2 rounded-lg shadow-sm w-full"
        >
          View
        </button>
        <button
          onClick={handleClickEdit}
          className="bg-gray-300 hover:bg-gray-400 transition-colors p-2 rounded-lg shadow-sm w-full"
        >
          Edit
        </button>
        <button
          onClick={handleClickDelete}
          className="bg-red-200 hover:bg-red-300 transition-colors p-2 rounded-lg shadow-sm w-full"
        >
          Delete
        </button>
      </div>
      <ModalEditEmployee
        employee={employee}
        modalForm={modalForm}
        setModalForm={setModalForm}
      />
      <ModalDeleteEmployee
        modalDelete={modalDelete}
        setModalDelete={setModalDelete}
        employee={employee}
      />
    </div>
  );
};

export { Employee };
