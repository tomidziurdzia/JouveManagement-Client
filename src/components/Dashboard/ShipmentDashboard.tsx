import { useEffect, useState } from "react";
import { ShipmentInterface } from "../../interfaces";
import { useShipment } from "../../hooks/useShipment";

interface Props {
  shipment: ShipmentInterface;
}

const ShipmentDashboard = ({ shipment }: Props) => {
  const [delivered, setDelivered] = useState(shipment.delivered);
  const { startEditShipment, startLoadingShipments } = useShipment();

  useEffect(() => {
    startLoadingShipments(1, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(delivered);

  const handleClick = async () => {
    await startEditShipment({
      id_shipment: shipment.id_shipment,
      delivered: !delivered,
      from: shipment.from,
      to: shipment.to,
      client: shipment.client,
      description: shipment.description,
    });
    setDelivered(!delivered);
  };

  return (
    <div className="border-b-2">
      <div className="flex items-center gap-10">
        <div className="flex w-full text-center p-4 text-l items-center h-full">
          <p className="w-2/12">{shipment.from}</p>
          <p className="w-2/12">{shipment.to}</p>
          <p className="w-3/12">{shipment.client}</p>
          <div className="w-3/12">
            <button
              onClick={handleClick}
              className={`${
                delivered === false
                  ? "bg-red-200 hover:bg-red-300"
                  : "bg-green-200 hover:bg-green-300"
              }  transition-colors p-2 rounded-lg shadow-sm w-full`}
            >
              {delivered === false ? "Not Delivered" : "Delivered"}
            </button>
          </div>
          <p className="w-3/12">{shipment.reason}</p>
          <p className="w-3/12">{shipment.picture}</p>
        </div>
      </div>
    </div>
  );
};

export { ShipmentDashboard };
