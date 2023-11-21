import { useState, useEffect } from "react";
import { useVehicle } from "../../hooks/useVehicle";
import { useAppSelector } from "../../store/store";
import { Link, useParams } from "react-router-dom";
import { month, formatDate } from "../../helpers";
import { IoChevronBack } from "react-icons/io5";
import { useTravel } from "../../hooks/useTravel";

const ViewVehicle = () => {
  const { id } = useParams();
  const { startGetVehicle } = useVehicle();
  const actualMonth = month[new Date().getMonth()].month;
  const [selectMonth, setSelectMonth] = useState(actualMonth);
  const { travels } = useAppSelector((state) => state.travel);
  const { vehicle } = useAppSelector((state) => state.vehicle);
  const { startLoadingTravels } = useTravel();

  useEffect(() => {
    startGetVehicle({
      id_vehicle: id,
      patent: "",
      model: "",
      typeVehicle: "",
    });
    startLoadingTravels(1, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterTravels = travels.filter(
    (travel) => travel.truck.id_vehicle === id
  );

  const searchMonth = month.filter((month) => month.month === selectMonth);
  console.log(filterTravels);
  const filterMonth = filterTravels.filter(
    (travel) => new Date(travel.date).getMonth() + 1 === searchMonth[0].id
  );

  console.log(filterTravels);

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
            {vehicle?.patent} {vehicle?.model}
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
      <div className=" flex text-2xl item-center text-center py-4">
        <p className="w-2/12">Date</p>
        <p className="w-4/12">Driver</p>
        <p className="w-3/12">Assistant</p>
        <p className="w-3/12">Semirremolque</p>
      </div>
      <div>
        {filterMonth.length ? (
          <div>
            {filterMonth.map((travel) => (
              <div className="flex items-center gap-10">
                <div className="flex w-full text-center p-4 border-b-2 text-xl">
                  <p className="w-2/12">{formatDate(travel.date)}</p>
                  <p className="w-4/12">
                    {travel.truck_driver.lastname} {travel.truck_driver.name}
                  </p>

                  <p className="w-3/12">
                    {travel.truck_assistant.lastname === "-"
                      ? ""
                      : travel.truck_assistant.lastname}{" "}
                    {travel.truck_assistant.name === ""
                      ? ""
                      : travel.truck_assistant.name}
                  </p>
                  <p className="w-3/12">
                    {travel.semi.patent === "-" ? "" : travel.semi.patent}{" "}
                    {travel.semi.model === "" ? "" : travel.semi.model}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-5 text-lg">
            This vehicle has not yet travelled this month
          </p>
        )}
      </div>
      <div className="p-4 text-2xl">Total de viajes: {filterMonth.length}</div>
    </div>
  );
};

export { ViewVehicle };
