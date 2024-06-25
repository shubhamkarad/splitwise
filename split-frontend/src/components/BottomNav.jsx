import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const Menus = [
    { name: "Groups", icon: "home-outline", dis: "translate-x-0" },
    { name: "Friends", icon: "people-outline", dis: "translate-x-20" },
    {
      name: "Activity",
      icon: "swap-horizontal-outline",
      dis: "translate-x-40",
    },
    { name: "Account", icon: "person-outline", dis: "translate-x-60" },
  ];
  const [active, setActive] = useState(0);
  return (
    <div className="max-h-[4.4rem] px-6 rounded-t-xl flex items-center justify-center w-screen  bg-gray-100 xl:w-screen">
      <ul className="flex relative">
        <span
          className={`bg-primary duration-500 ${Menus[active].dis} border-gray-600 h-16 w-16 absolute
         -top-5 rounded-full`}
        >
          <span
            className="w-3.5 h-3.5 bg-transparent absolute top-4 -left-[18px] 
          rounded-tr-[11px] shadow-myShadow1"
          ></span>
          <span
            className="w-3.5 h-3.5 bg-transparent absolute top-4 -right-[18px] 
          rounded-tl-[11px] shadow-myShadow2"
          ></span>
        </span>
        {Menus.map((menu, i) => (
          <li key={i} className="w-20">
            <Link
              to={menu.name}
              className="flex flex-col text-center pt-6"
              onClick={() => setActive(i)}
            >
              <span
                className={`text-2xl cursor-pointer duration-500 ${
                  i === active && "-mt-6 mr-4 text-white"
                }`}
              >
                <ion-icon name={menu.icon}></ion-icon>
              </span>
              <span
                className={` ${
                  active === i
                    ? "translate-y-4 duration-700 opacity-100"
                    : "opacity-0 translate-y-10"
                } `}
              >
                {menu.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
