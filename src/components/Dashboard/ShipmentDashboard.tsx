import { ShipmentInterface } from "../../interfaces";

interface Props {
  shipment: ShipmentInterface;
}

const ShipmentDashboard = ({ shipment }: Props) => {
  return (
    <div className="border-b-2">
      <div className="flex items-center gap-10">
        <div className="flex w-full text-center p-4 text-l">
          <p className="w-2/12">{shipment.from}</p>
          <p className="w-2/12">{shipment.to}</p>
          <p className="w-3/12">{shipment.client}</p>
          <p className="w-3/12">
            {shipment.delivered === false ? "Not Delivered" : "Delivered"}
          </p>
          <p className="w-3/12">{shipment.reason}</p>
          <p className="w-3/12">{shipment.picture}</p>
        </div>
      </div>
    </div>
  );
};

export { ShipmentDashboard };
