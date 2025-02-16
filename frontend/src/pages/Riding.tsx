import { BsCash } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { GrLocationPin } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {};

  return (
    <>
      <div className="h-screen">
        <Link
          to="/home"
          className="fixed  right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <FaHome className="text-lg font-medium" />
        </Link>
        <div className="h-1/2">
          <img
            className="h-full w-full"
            src="https://i0.wp.com/www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png?fit=493%2C383&ssl=1"
            alt=""
          />
        </div>
        <div className="h-1/2 p-4">
          <div className="flex items-center justify-between">
            <img
              className="h-12"
              src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
              alt=""
            />
            <div className="text-right">
              <h4 className="text-lg font-medium">
                {ride?.driver.fullname.firstname}
              </h4>
              <h3 className="text-xl font-semibold -mt-1 -mb-1">
                {ride?.driver.vehicle.vehicleNumber}
              </h3>
              <p className="text-sm text-gray-600">
                {" "}
                {ride?.driver.vehicle.vehicleName}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 justify-between items-center">
            <div className="w-full mt-5">
              <div className="flex items-center gap-5 p-3 border-b-2">
                <GrLocationPin className="text-lg" />
                <div>
                  <h3 className="text-lg font-medium">Address</h3>
                  <p className="text-sm text-gray-600">{ride?.destination}</p>
                </div>
              </div>
              <div className="flex items-center gap-5 p-3">
                <BsCash className="text-lg" />
                <div>
                  <h3 className="text-lg font-medium">Rs {ride?.fare}</h3>
                  <p className="text-sm text-gray-600">Cash</p>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full bg-green-600 text-white font-semibold rounded-lg p-3 mt-5">
            Make a Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default Riding;
