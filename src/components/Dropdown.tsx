import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useAppSelector } from "../store/store";
import { IoLogOut, IoPersonCircle, IoSettingsSharp } from "react-icons/io5";
import { useAuth } from "../hooks/useAuth";

const Dropdown = () => {
  const { business } = useAppSelector((state) => state.auth);
  const { startLogout } = useAuth();
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          <div className=" flex items-center gap-2 hover:cursor-pointer hover:bg-gray-100 hover:transition-colors px-4 py-2 rounded-md">
            <img
              src={"../../public/logo.jpg"}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm">{business?.businessName}</p>
              <p className="text-xs font-light">Manager</p>
            </div>
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "flex items-center gap-2 px-4 py-2 text-sm"
                  )}
                >
                  <IoPersonCircle />
                  Edit Profile
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "flex items-center gap-2 px-4 py-2 text-sm"
                  )}
                >
                  <IoSettingsSharp />
                  Settings
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <button onClick={startLogout} className="w-full">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "flex items-center gap-2 px-4 py-2 text-sm"
                    )}
                  >
                    <IoLogOut />
                    Logout
                  </a>
                )}
              </Menu.Item>
            </button>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export { Dropdown };
