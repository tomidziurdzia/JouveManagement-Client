import { useEffect } from "react";
import { useShipment } from "../../hooks/useShipment";
import { ShipmentInterface, TravelInterface } from "../../interfaces";
import { useAppSelector } from "../../store/store";
import { ShipmentDashboard } from ".";

interface Props {
  travel: TravelInterface;
}

const TravelDashboard = ({ travel }: Props) => {
  const { startLoadingShipments } = useShipment();
  const { shipments } = useAppSelector((state) => state.shipment);
  useEffect(() => {
    startLoadingShipments(1, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterShipments = shipments.filter(
    (shipment) => shipment.travel?.id_travel === travel.id_travel
  );

  return (
    <div>
      <div className="flex px-4 py-2 items-center border-gray-100 border-b-2 text-l">
        <div className="w-3/12">
          <p className="w-2/3 m-auto capitalize">
            {travel.truck_driver?.lastname} {travel.truck_driver?.name}
          </p>
        </div>
        <p className="w-3/12 capitalize">
          {travel.truck_assistant?.lastname !== "-"
            ? travel.truck_assistant?.lastname +
              " " +
              travel.truck_assistant?.name
            : "-"}
        </p>
        <div className="w-2/12">
          <p className="m-auto capitalize">
            {travel.truck?.patent +
              (travel.semi?.model === "-" || travel.semi === null
                ? ""
                : "   -   " + travel.semi?.patent)}
          </p>
        </div>
      </div>
      <div>
        {filterShipments.length !== 0 && (
          <div className="">
            <div className="flex items-center gap-10">
              <div className="flex w-full text-center p-4 border-b-2 text-xl">
                <p className="w-2/12">From</p>
                <p className="w-2/12">To</p>
                <p className="w-3/12">Client</p>
                <p className="w-3/12">Delivered</p>
                <p className="w-3/12">Reason</p>
                <p className="w-3/12">Picture</p>
              </div>
            </div>
          </div>
        )}
        {filterShipments.length !== 0 &&
          filterShipments.map((shipment: ShipmentInterface) => (
            <ShipmentDashboard key={shipment.id_shipment} shipment={shipment} />
          ))}
      </div>
    </div>
  );
};

export { TravelDashboard };
