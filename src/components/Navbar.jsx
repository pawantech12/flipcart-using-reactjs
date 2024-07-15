import React from "react";
import { MdOutlineMenu } from "react-icons/md";
import logo from "../img/flipcart-logo.png";
import { FaShoppingCart } from "react-icons/fa";
export const Navbar = () => {
  return (
    <>
      <header className="bg-blue-600 px-3 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <MdOutlineMenu className="text-white w-5 h-5" />
            <img src={logo} alt="" className="w-20" />
          </div>
          <div className="relative">
            <button className="text-white">
              <FaShoppingCart className="w-5 h-5" />
            </button>
            <span className="absolute top-[-30%] left-[60%] border-2 bg-red-600 text-white border-white rounded-full px-1 text-[10px]">
              1
            </span>
          </div>
        </div>
        <div className="mt-3">
          <input
            type="text"
            className="w-full h-10 px-5 text-sm rounded-sm"
            placeholder="Search for Products, Brands and More"
          />
        </div>
      </header>
    </>
  );
};
