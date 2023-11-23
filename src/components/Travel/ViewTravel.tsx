import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import { month, formatDate } from "../../helpers";
import { useTravel } from "../../hooks/useTravel";
import { IoChevronBack } from "react-icons/io5";
import { useShipment } from "../../hooks/useShipment";

const ViewTravel = () => {
  const { id } = useParams();
  const { startGetTravel } = useTravel();
  const { startLoadingShipments } = useShipment();
  const { travel } = useAppSelector((state) => state.travel);
  const { shipments } = useAppSelector((state) => state.shipment);
  const actualMonth = month[new Date().getMonth()].month;
  const [selectMonth, setSelectMonth] = useState(actualMonth);

  useEffect(() => {
    startGetTravel({
      id_travel: id,
      date: "",
      semi: undefined,
      truck: undefined,
      truck_assistant: undefined,
      truck_driver: undefined,
    });
    startLoadingShipments(1, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterShipments = shipments.filter(
    (shipment) => shipment.travel?.id_travel === id
  );

  const searchMonth = month.filter((month) => month.month === selectMonth);

  const filterMonth = filterShipments.filter(
    (shipment) =>
      new Date(shipment.travel!.date).getMonth() + 1 === searchMonth[0].id
  );

  return (
    <div className="bg-white p-4 m-4 shadow-md border-b-2 rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex">
          <Link
            className="bg-primary mr-4 text-white text-3xl p-1 flex rounded-full hover:opacity-80 hover:transition-colors"
            to={"/travels"}
          >
            <IoChevronBack />
          </Link>
          <p className="text-2xl">
            {formatDate(travel?.date as string)}
            {" - "} {travel?.truck_driver?.lastname}{" "}
            {travel?.truck_driver?.name}
            {" - "} {travel?.truck_assistant?.lastname}{" "}
            {travel?.truck_assistant?.name} {" - "} {travel?.truck?.patent}
            {travel?.semi?.patent === "-" ? "" : travel?.semi?.patent}
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
      <div className="flex text-2xl item-center text-center p-4">
        <p className="w-2/12">From</p>
        <p className="w-2/12">To</p>
        <p className="w-2/12">Client</p>
        <p className="w-4/12">Description</p>
        <p className="w-2/12">Delivered</p>
      </div>
      <div>
        {filterMonth.length ? (
          <div>
            {filterMonth.map((shipment) => (
              <div
                key={shipment.id_shipment}
                className="flex item-center text-center text-lg p-4"
              >
                <p className="w-2/12">{shipment.from}</p>
                <p className="w-2/12">{shipment.to}</p>
                <p className="w-2/12">{shipment.client}</p>
                <p className="w-4/12">{shipment.description}</p>
                <p
                  className={`w-2/12 ${
                    shipment.delivered === false ? "bg-red-200" : "bg-green-200"
                  } 
                  p-2 rounded-lg shadow-sm
                            `}
                >
                  {shipment.delivered === true ? "Delivered" : "Not Delivered"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-5 text-lg">
            This travel has not yet shipments this month
          </p>
        )}
      </div>
      <div className="p-4 text-2xl">Total shipments: {filterMonth.length}</div>
    </div>
  );
};

export { ViewTravel };
