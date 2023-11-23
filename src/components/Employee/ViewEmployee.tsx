import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEmployee } from "../../hooks/useEmployee";
import { useAppSelector } from "../../store/store";
import { month, formatDate } from "../../helpers";
import { useTravel } from "../../hooks/useTravel";
import { IoChevronBack } from "react-icons/io5";

const ViewEmployee = () => {
  const { id } = useParams();
  const { startGetEmployee } = useEmployee();
  const { startLoadingTravels } = useTravel();
  const { employee } = useAppSelector((state) => state.employee);
  const { travels } = useAppSelector((state) => state.travel);
  const actualMonth = month[new Date().getMonth()].month;
  const [selectMonth, setSelectMonth] = useState(actualMonth);

  useEffect(() => {
    startGetEmployee({
      id_employee: id,
      name: "",
      lastname: "",
      cuil: "",
      password: "",
      type: "",
    });
    startLoadingTravels(1, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterTravels = travels.filter(
    (travel) => travel.truck_driver?.id_employee === id
  );

  const filterTravelsAssistant = travels.filter(
    (travel) => travel.truck_assistant?.id_employee === id
  );

  const searchMonth = month.filter((month) => month.month === selectMonth);

  const filterMonth = filterTravels.filter(
    (travel) => new Date(travel.date).getMonth() + 1 === searchMonth[0].id
  );

  const filterMonthAssistant = filterTravelsAssistant.filter(
    (travel) => new Date(travel.date).getMonth() + 1 === searchMonth[0].id
  );

  return (
    <div className="bg-white p-4 m-4 shadow-md border-b-2 rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex">
          <Link
            className="bg-primary mr-4 text-white text-3xl p-1 flex rounded-full hover:opacity-80 hover:transition-colors"
            to={"/employees"}
          >
            <IoChevronBack />
          </Link>
          <p className="text-2xl">
            {employee?.name} {employee?.lastname}
          </p>
        </div>
        <div className="w-3/12">
          <select
            name="month"
            id="month"
            value={selectMonth}
            onChange={(e) => setSelectMonth(e.target.value)}
            className="border w-full text-xl placeholder-gray-400 rounded-md p-2"
          >
            <option value="">-- Select --</option>
            {month.map((month) => (
              <option key={month.id}>{month.month}</option>
            ))}
          </select>
        </div>
      </div>
      {filterTravels.length !== 0 && (
        <>
          <div className=" flex text-2xl item-center text-center py-4">
            <p className="w-2/12">Date</p>
            <p className="w-4/12">Truck</p>
            <p className="w-3/12">Assistant</p>
            <p className="w-3/12">Semirremolque</p>
          </div>

          <div>
            {filterMonth.length ? (
              <div>
                {filterMonth.map((travel) => (
                  <div key={travel.id_travel} className="flex items-center">
                    <div className="flex w-full text-center p-4 border-b-2 text-xl">
                      <p className="w-2/12">{formatDate(travel.date)}</p>
                      <p className="w-4/12">
                        {travel.truck?.patent} - {travel.truck?.model}
                      </p>

                      <p className="w-3/12">
                        {travel.truck_assistant?.name}{" "}
                        {travel.truck_assistant?.lastname}
                      </p>
                      <p className="w-3/12">
                        {travel.semi?.patent === "-"
                          ? "-"
                          : travel.semi?.patent}{" "}
                        {travel.semi?.model === "-" ? "" : travel.semi?.model}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-5 text-lg">
                This employee has not yet travelled this month
              </p>
            )}
          </div>
        </>
      )}
      {filterTravelsAssistant.length !== 0 && (
        <>
          <div className=" flex text-2xl item-center text-center py-4">
            <p className="w-2/12">Date</p>
            <p className="w-4/12">Truck</p>
            <p className="w-3/12">Driver</p>
            <p className="w-3/12">Semirremolque</p>
          </div>

          <div>
            {filterMonthAssistant.length ? (
              <div>
                {filterMonthAssistant.map((travel) => (
                  <div key={travel.id_travel} className="flex items-center">
                    <div className="flex w-full text-center p-4 border-b-2 text-xl">
                      <p className="w-2/12">{formatDate(travel.date)}</p>
                      <p className="w-4/12">
                        {travel.truck?.patent} - {travel.truck?.model}
                      </p>

                      <p className="w-3/12">
                        {travel.truck_driver?.name}{" "}
                        {travel.truck_driver?.lastname}
                      </p>
                      <p className="w-3/12">
                        {travel.semi?.patent === "-"
                          ? "-"
                          : travel.semi?.patent}{" "}
                        {travel.semi?.model === "-" ? "" : travel.semi?.model}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-5 text-lg">
                This employee has not yet travelled this month
              </p>
            )}
          </div>
        </>
      )}

      <div className="p-4 text-2xl">
        Total travels:{" "}
        {filterTravels.length !== 0
          ? filterMonth.length
          : filterMonthAssistant.length}
      </div>
    </div>
  );
};

export { ViewEmployee };
