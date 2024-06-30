import React, { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/logo.jpg";
import Coin from "../assets/coin.ico";
import { useFieldContext } from "../contexts/FieldContext";
import { useAuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const navigation = [
  { name: "All", href: "#Intro" },
  { name: "pending", href: "#About" },
  { name: "Completed", href: "#Education" },
];

const Navbar = () => {
  const { authUser } = useAuthContext();
  const { value, setValue } = useFieldContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coins, setCoins] = useState(0);
  return (
    <header className={`bg-white text-black sticky top-0 z-50 px-2 py-2`}>
      <nav
        className="container mx-auto px-6 lg:px-8 flex items-center justify-between"
        aria-label="Global"
      >
        <div className="hidden  lg:flex lg:flex-1  ">
          <img src={Logo} alt="logo" className="h-10 w-10" />
        </div>
        <div className=" lg:hidden flex items-center">
          <img src={Logo} alt="logo" className="h-10 w-10" />
        </div>
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            onClick={() => {
              setValue("pending");
            }}
            key="pending"
            className={`cursor-pointer text-base font-semibold leading-6 
              ${value==="pending" ? "text-blue-500" : ""} hover:text-blue-500`}
          >
            pending
          </Link>
          <Link
            key="completed"
            onClick={() => {
              setValue("completed");
            }}
            className={`cursor-pointer text-base font-semibold leading-6 
              ${value==="completed" ? "text-blue-500" : ""} hover:text-blue-500`}
          >
            completed
          </Link>
          {authUser.role === "Teacher" ? (
            <Link
              key="History"
              onClick={() => {
                setValue("history");
              }}
              className={`cursor-pointer text-base font-semibold leading-6 
                ${value==="history" ? "text-blue-500" : ""} hover:text-blue-500`}
            >
              History
            </Link>
          ) : (
            <Link
              key="upload"
              onClick={() => {
                setValue("upload");
              }}
              className={`cursor-pointer text-base font-semibold leading-6 
                ${value==="upload" ? "text-blue-500" : ""} hover:text-blue-500`}
            >
              upload
            </Link>
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
          <a href="logout"> logout </a>
          {authUser.role === "Teacher" && (
            <div className="flex rounded-xl p-2 border-solid border-2 border-black">
              TotalCoins
              <img src={Coin} alt="coin" className="h-5 w-5" />
              <span className="text-sm font-semibold">{coins}</span>
            </div>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50  opacity-25" />
        <DialogPanel
          className={`text-black bg-white fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto px-6 py-6`}
        >
          <div className="flex items-center justify-between">
            <span></span>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6">
            <div className="space-y-2">
              <Link
                key="pending"
                to="/pending"
                className={`cursor-pointer block rounded-lg px-3 py-2 text-base font-semibold leading-7
                   ${value==="pending" ? "text-blue-500" : ""} hover:text-blue-500`}
              >
                pending
              </Link>
              <Link
                key="completed"
                onClick={() => {
                  setValue("completed");
                }}
                className={`cursor-pointer block rounded-lg px-3 py-2 text-base font-semibold leading-7
                  ${value==="pending" ? "text-blue-500" : ""} hover:text-blue-500`}
              >
                completed
              </Link>
              {authUser.role === "Teacher" && (
                <Link
                  key="History"
                  onClick={() => {
                    setValue("History");
                  }}
                  className={`cursor-pointer block rounded-lg px-3 py-2 text-base font-semibold leading-7
                    ${value==="pending" ? "text-blue-500" : ""} hover:text-blue-500`}
                >
                  History
                </Link>
              )}
              <a
                key="logout"
                href="logout"
                className={`cursor-pointer block rounded-lg px-3 py-2 text-base font-semibold leading-7
                  ${value==="pending" ? "text-blue-500" : ""} hover:text-blue-500`}
              >
                logout
              </a>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navbar;