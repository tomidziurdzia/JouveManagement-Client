import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/store";
import { useTravel } from "../../hooks/useTravel";
import { TravelDashboard } from "../../components/Dashboard";
import { TravelInterface } from "../../interfaces";
import { getDate } from "../../helpers";

const Dashboard = () => {
  const { travels } = useAppSelector((state) => state.travel);
  const { startLoadingTravels } = useTravel();
  const [filterDate, setFilterDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    startLoadingTravels(1, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const travelFilterByDate: TravelInterface[] = travels.filter(
    (travel) => travel.date === filterDate
  );

  return (
    <>
      <div className="p-6">
        <div className="flex items-center gap-10">
          <p className="w-full text-2xl text-center">{getDate(filterDate)}</p>
          <form className="mr-10">
            <input
              id="filterDate"
              name="filterDate"
              className="text-2xl bg-gray-50"
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </form>
        </div>
        <div className="bg-gray-50  shadow-sm rounded-md mt-5">
          <>
            {travelFilterByDate.length ? (
              travelFilterByDate.map((travel: TravelInterface) => {
                return (
                  <div
                    key={travel.id_travel}
                    className="mb-10 shadow-md rounded-lg bg-white"
                  >
                    <div className="hidden mb-2 lg:flex w-full text-center p-4 text-xl">
                      <div className="w-3/12">
                        <p className="w-2/3 m-auto  text-left">Driver</p>
                      </div>
                      <div className="w-3/12">
                        <p className="w-2/3  text-left">Assistant</p>
                      </div>
                      <p className="w-2/12 text-left">Vehicle</p>
                      <p className="w-3/12">Actions</p>
                    </div>
                    <TravelDashboard key={travel.id_travel} travel={travel} />
                  </div>
                );
              })
            ) : (
              <div className="text-center py-5 text-lg">Add a new travel</div>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export { Dashboard };
