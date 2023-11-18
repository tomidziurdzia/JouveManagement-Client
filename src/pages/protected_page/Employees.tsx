import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { EmployeeInterface } from "../../interfaces";
import { Pagination } from "../../components";

import { useAppSelector } from "../../store/store";
import { useEmployee } from "../../hooks/useEmployee";
import { usePagination } from "../../hooks/usePagination";
import { Employee, ModalNewEmployee } from "../../components/Employee/";

const Employees = () => {
  const [modalForm, setModalForm] = useState(false);
  const { startLoadingEmployees } = useEmployee();
  const { employees: employeesFilter } = useAppSelector(
    (state) => state.employee
  );

  const employees = employeesFilter.filter(
    (employee) => employee.id_employee !== "empty-assistant"
  );
  const {
    page,
    handlePrev,
    handleNext,
    itemsPerPage,
    lastPageEmployees: lastPage,
  } = usePagination();

  useEffect(() => {
    startLoadingEmployees(page, itemsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employees.length, page]);

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
        <ModalNewEmployee modalForm={modalForm} setModalForm={setModalForm} />
        <p className="w-full text-xl">Employeers List</p>
      </div>
      <div className="bg-gray-50 shadow-sm rounded-md mt-5">
        <div className="hidden lg:flex w-full text-center p-4 border-b-2 text-xl">
          <p className="w-1/12">Picture</p>
          <p className="w-5/12">Fullname</p>
          <p className="w-3/12">Type</p>
          <p className="w-3/12">Actions</p>
        </div>
        <>
          {employees.length ? (
            employees.map((employee: EmployeeInterface) => (
              <Employee key={employee.id_employee} employee={employee} />
            ))
          ) : (
            <div className="text-center py-5 text-lg">Add a new employee</div>
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

export { Employees };
