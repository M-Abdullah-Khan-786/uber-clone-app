import { RiLogoutCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import DriverDetails from "../components/DriverDetails";

const DriverHome = () => {
  return (
    <>
      <div className="h-screen">
        <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
          <img
            className="w-16"
            src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
            alt=""
          />
          <Link
            to="/home"
            className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
          >
            <RiLogoutCircleFill className="text-2xl font-medium" />
          </Link>
        </div>
        <div className="h-3/5">
          <img
            className="h-full w-full"
            src="https://i0.wp.com/www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png?fit=493%2C383&ssl=1"
            alt=""
          />
        </div>
        <div className="h-2/5 p-6">
          <DriverDetails />
        </div>
      </div>
    </>
  );
};

export default DriverHome;
