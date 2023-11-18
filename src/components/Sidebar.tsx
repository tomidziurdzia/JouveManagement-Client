import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="min justify-between">
      <nav className="flex gap-4 mt-4 flex-col w-3/4 m-auto">
        <NavLink className="nav-link p-1 pl-2" to="/">
          Dashboard
        </NavLink>
        <NavLink className="nav-link p-1 pl-2" to="/employees">
          Employees
        </NavLink>
        <NavLink className="nav-link p-1 pl-2" to="/vehicles">
          Vehicles
        </NavLink>
        <NavLink className="nav-link p-1 pl-2" to="/travels">
          Travels
        </NavLink>
        <NavLink className="nav-link p-1 pl-2" to="/shipments">
          Shipments
        </NavLink>
      </nav>
    </div>
  );
};

export { Sidebar };
