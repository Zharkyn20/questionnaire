import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import useAuthStore from "@/modules/auth/store";

export default function Logout() {
  const userState = useAuthStore();
  return (
    <div className="relative z-10">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button>
            <UserIcon className="-mr-1 ml-2 h-5 w-5 text-gray-700 hover:text-primary" />
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
          <Menu.Items className="absolute right-0 mt-1 origin-top-right bg-white border shadow rounded hover:text-primary">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {() => (
                  <button
                    className={classNames(
                      "group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-primary text-nowrap"
                    )}
                    onClick={userState.signout}
                  >
                    sign out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
