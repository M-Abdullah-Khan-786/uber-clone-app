import { CiUser } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

interface VehiclePannelProps {
  setVehiclePanel: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmVehiclePannel: React.Dispatch<React.SetStateAction<boolean>>;
  fareEstimate: any;
  setVehicleType: any;
}

const VehiclePannel: React.FC<VehiclePannelProps> = ({
  setVehiclePanel,
  setConfirmVehiclePannel,
  fareEstimate,
  setVehicleType,
}) => {
  const carFare = fareEstimate?.car || "0";
  const autoFare = fareEstimate?.auto || "0";
  const bikeFare = fareEstimate?.bike || "0";

  return (
    <>
      <h5
        onClick={() => {
          setVehiclePanel(false);
        }}
        className="p-1 text-center w-[93%] absolute top-0  flex justify-center items-center"
      >
        <IoIosArrowDown className="text-3xl text-gray-400" />
      </h5>

      <h3 className="text-2xl font-semibold mb-5">Choose your Drive</h3>
      <div
        onClick={() => {
          setVehicleType("car");
          setConfirmVehiclePannel(true);
        }}
        className="w-full mb-2 p-3 border-2 active:border-black bg-gray-100 rounded-xl flex justify-center ite"
      >
        <img
          className="h-10"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />
        <div className="w-1/2 ml-2">
          <h4 className="font-medium text-base">
            UberGo{" "}
            <span style={{ display: "inline-flex", alignItems: "center" }}>
              <CiUser /> 4
            </span>
          </h4>

          <h5 className="font-medium text-sm">5 mins away</h5>
          <p className="font-normal text-xs">Affordable, car ride</p>
        </div>
        <h3 className="text-lg font-semibold">Rs{carFare}</h3>
      </div>

      <div
        onClick={() => {
          setVehicleType("auto");
          setConfirmVehiclePannel(true);
        }}
        className="w-full mb-2 p-3 border-2 active:border-black bg-gray-100 rounded-xl flex justify-center ite"
      >
        <img
          className="h-10"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />
        <div className="w-1/2 ml-2">
          <h4 className="font-medium text-base">
            UberAuto{" "}
            <span style={{ display: "inline-flex", alignItems: "center" }}>
              <CiUser /> 3
            </span>
          </h4>

          <h5 className="font-medium text-sm">10 mins away</h5>
          <p className="font-normal text-xs">Affordable, auto ride</p>
        </div>
        <h3 className="text-lg font-semibold">Rs{autoFare}</h3>
      </div>

      <div
        onClick={() => {
          setVehicleType("bike");
          setConfirmVehiclePannel(true);
        }}
        className="w-full mb-2 p-3 border-2 active:border-black bg-gray-100 rounded-xl flex justify-center ite"
      >
        <img
          className="h-10"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="w-1/2 ml-2">
          <h4 className="font-medium text-base">
            UberMoto{" "}
            <span style={{ display: "inline-flex", alignItems: "center" }}>
              <CiUser /> 1
            </span>
          </h4>

          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-normal text-xs">Affordable, bike ride</p>
        </div>
        <h3 className="text-lg font-semibold">Rs{bikeFare}</h3>
      </div>
    </>
  );
};

export default VehiclePannel;
