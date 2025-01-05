import {  IoIosArrowUp } from "react-icons/io";
import { RiLogoutCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const DriverRiding = () => {
  return (
    <>
      <div className="h-screen overflow-hidden">
        <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
          <img
            className="w-16"
            src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
            alt=""
          />
          <Link
            to="/driver-home"
            className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
          >
            <RiLogoutCircleFill className="text-2xl font-medium" />
          </Link>
        </div>
        <div className="h-4/5">
          <img
            className="h-full w-full object-cover"
            src="https://i0.wp.com/www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png?fit=493%2C383&ssl=1"
            alt=""
          />
        </div>
        <div className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-300">
          <h5 className="p-1 text-center w-[95%] absolute top-0  flex justify-center items-center">
            <IoIosArrowUp className="text-3xl text-gray-400" />
          </h5>
          <h4 className="text-xl font-semibold">2.2 KM Away!</h4>
          <button className="bg-black text-white font-semibold rounded-lg p-3 px-10">
            Complete Ride
          </button>
        </div>
      </div>
    </>
  );
};

export default DriverRiding;
