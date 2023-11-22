import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import { IoChevronBack } from "react-icons/io5";
import { useShipment } from "../../hooks/useShipment";

const ViewShipment = () => {
  const { id } = useParams();
  const { startGetShipment } = useShipment();
  const { shipment } = useAppSelector((state) => state.shipment);

  const [delivered, setDelivered] = useState(shipment?.delivered);
  const { startEditShipment } = useShipment();

  console.log(shipment);

  useEffect(() => {
    startGetShipment({
      id_shipment: id,
      from: "",
      to: "",
      client: "",
      description: "",
      delivered: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shipment?.delivered]);

  const handleClick = async () => {
    await startEditShipment({
      id_shipment: shipment?.id_shipment,
      delivered: !delivered,
      from: shipment?.from as string,
      to: shipment?.to as string,
      client: shipment?.client as string,
      description: shipment?.description as string,
    });
    setDelivered(!delivered);
  };

  return (
    <div className="bg-white p-4 m-4 shadow-md border-b-2 rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex">
          <Link
            className="bg-primary mr-4 text-white text-3xl p-1 flex rounded-full hover:opacity-80 hover:transition-colors"
            to={"/shipments"}
          >
            <IoChevronBack />
          </Link>
        </div>
        <div className="w-3/12"></div>
      </div>
      <div>
        <div className="flex text-2xl item-center text-center p-4">
          <p className="w-3/12">From</p>
          <p className="w-3/12">To</p>
          <p className="w-3/12">Client</p>
          <p className="w-3/12">Delivered</p>
        </div>
        <div className="flex text-xl items-center text-center p-4">
          <p className="w-3/12">{shipment?.from}</p>
          <p className="w-3/12">{shipment?.to}</p>
          <p className="w-3/12">{shipment?.client}</p>
          <button
            onClick={handleClick}
            className={`${
              shipment?.delivered === false
                ? "bg-red-200 hover:bg-red-300"
                : "bg-green-200 hover:bg-green-300"
            }  transition-colors p-2 rounded-lg shadow-sm w-3/12`}
          >
            {shipment?.delivered === false ? "Not Delivered" : "Delivered"}
          </button>
        </div>
      </div>
    </div>
  );
};

export { ViewShipment };
