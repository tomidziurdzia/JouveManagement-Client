import { useAppSelector } from "../store/store";
import { AiOutlineSearch } from "react-icons/ai";
import { Dropdown } from "./";
import { Link } from "react-router-dom";

const Header = () => {
  const { business } = useAppSelector((state) => state.auth);
  return (
    <div className="flex items-center">
      <Link to="/" className="w-3/12 flex items-center p-4 gap-4">
        <img src={"../../public/logo.jpg"} className="w-16 rounded-full" />
        <p className="text-primary text-2xl">{business?.businessName}</p>
      </Link>
      <div className="w-6/12 flex justify-center">
        <div className="flex w-1/2 items-center gap-2  bg-gray-100 py-1 px-2 rounded-md">
          <AiOutlineSearch />
          <input
            className="w-full bg-gray-100 text-gray-600"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="w-3/12 justify-end p-4 flex items-center gap-2 hover:cursor-pointer">
        <Dropdown />
      </div>
    </div>
  );
};

export { Header };
