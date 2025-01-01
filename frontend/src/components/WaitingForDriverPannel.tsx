import { BsCash } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { GrLocationPin } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";

interface waitingForDriverPannelProps {
  setWaitingForDriverPannel: React.Dispatch<React.SetStateAction<boolean>>;
}

const WaitingForDriverPannel: React.FC<waitingForDriverPannelProps> = ({
  setWaitingForDriverPannel,
}) => {
  return (
    <>
      <h5
        onClick={() => {
          setWaitingForDriverPannel(false);
        }}
        className="p-1 text-center w-[93%] absolute top-0  flex justify-center items-center"
      >
        <IoIosArrowDown className="text-3xl text-gray-400" />
      </h5>

      <div className="flex items-center justify-between">
        <img
          className="h-12"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />
        <div className="text-right">
          <h4 className="text-lg font-medium">Usman</h4>
          <h3 className="text-xl font-semibold -mt-1 -mb-1">ABC-12A-1234</h3>
          <p className="text-sm text-gray-600">WagonR</p>
        </div>
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
      </div>
    </>
  );
};

export default WaitingForDriverPannel;