import { BsCash } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { GrLocationPin } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

interface confirmRidePopupPannelProps {
  setRidePopUPPanel: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmRidePopUPPanel: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmRidePopupPannel: React.FC<confirmRidePopupPannelProps> = ({
  setRidePopUPPanel,
  setConfirmRidePopUPPanel
}) => {
  return (
    <>
      <h5
        onClick={() => {
          setConfirmRidePopUPPanel(false);
        }}
        className="p-1 text-center w-[93%] absolute top-0  flex justify-center items-center"
      >
        <IoIosArrowDown className="text-3xl text-gray-400" />
      </h5>

      <h3 className="text-2xl font-semibold mb-5">Confirm Ride!</h3>
      <div className="flex items-center  justify-between bg-gray-200 rounded-lg p-3 mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5eW8OvSN4zaimWuFO2ff4Q-Es1FS8ajh4WA&s"
            alt=""
          />
          <h2 className="text-lg font-medium">Usman</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex flex-col gap-2 justify-between items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <FaLocationDot className="text-lg" />
            <div>
              <h3 className="text-lg font-medium">Address</h3>
              <p className="text-sm text-gray-600">Example Address</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <GrLocationPin className="text-lg" />
            <div>
              <h3 className="text-lg font-medium">Address</h3>
              <p className="text-sm text-gray-600">Example Address</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <BsCash className="text-lg" />
            <div>
              <h3 className="text-lg font-medium">Rs 220</h3>
              <p className="text-sm text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <Link to="/driver-riding" className="flex justify-center w-full bg-black text-white font-semibold rounded-lg p-3 mt-5">
          Confirm
        </Link>
        <button
          onClick={() => {
            setConfirmRidePopUPPanel(false);
            setRidePopUPPanel(false); 
          }}
          className="w-full bg-red-400 hover:bg-red-600 text-white font-semibold rounded-lg p-3 mt-5"
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default ConfirmRidePopupPannel;
