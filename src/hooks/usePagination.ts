import { useState } from "react";
import { useAppSelector } from "../store/store";

export const usePagination = () => {
  const { total: totalEmployees } = useAppSelector((state) => state.employee);
  const { total: totalVehicles } = useAppSelector((state) => state.vehicle);
  const { total: totalTravels } = useAppSelector((state) => state.travel);

  const [page, setPage] = useState(1);

  const handlePrev = () => {
    setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const itemsPerPage = 10;
  const lastPageEmployees = Math.ceil(totalEmployees / itemsPerPage);
  const lastPageVehicles = Math.ceil(totalVehicles / itemsPerPage);
  const lastPageTravels = Math.ceil(totalTravels / itemsPerPage);

  return {
    setPage,
    page,
    handlePrev,
    handleNext,
    lastPageEmployees,
    lastPageVehicles,
    lastPageTravels,
    itemsPerPage,
  };
};
