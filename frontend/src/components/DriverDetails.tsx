import { FaBook } from "react-icons/fa6";
import { IoIosSpeedometer, IoIosTime } from "react-icons/io";

const DriverDetails = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5eW8OvSN4zaimWuFO2ff4Q-Es1FS8ajh4WA&s"
            alt=""
          />
          <h4 className="text-lg font-medium">Ahmad</h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">Rs200</h4>
          <p className="text-sm  text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex justify-center gap-8 items-center p-3 mt-8 bg-gray-100 rounded-xl">
        <div className="text-center">
          <IoIosTime className="text-3xl mb-2 font-thin inline-block" />
          <h5 className="text-lg font-medium">10.20</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>

        <div className="text-center">
          <IoIosSpeedometer className="text-3xl mb-2 font-thin inline-block" />

          <h5 className="text-lg font-medium">10.20</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <FaBook className="text-3xl mb-2 font-thin inline-block" />
          <h5 className="text-lg font-medium">10.20</h5>

          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </>
  );
};

export default DriverDetails;
