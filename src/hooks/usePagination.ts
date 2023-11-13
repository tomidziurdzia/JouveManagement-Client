import { useState } from "react";
import { useAppSelector } from "../store/store";

export const usePagination = () => {
  const { total: totalEmployees } = useAppSelector((state) => state.employee);

  const [page, setPage] = useState(1);

  const handlePrev = () => {
    setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const employeesPerPage = 6;
  const lastPage = Math.ceil(totalEmployees / employeesPerPage);

  return {
    setPage,
    page,
    handlePrev,
    handleNext,
    lastPage,
    employeesPerPage,
  };
};
