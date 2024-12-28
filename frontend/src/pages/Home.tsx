import { FormEvent, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { IoIosArrowDown } from "react-icons/io";
import LocationPannel from "../components/LocationPannel";
import VehiclePannel from "../components/VehiclePannel";

const Home = () => {
  const [panelOpen, setpanelOpen] = useState(false);
  const [formValues, setformValues] = useState({
    pickup: "",
    dropooff: "",
  });
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const panelRef = useRef(null);
  const panelArrowRef = useRef(null);
  const vehiclePanelRef = useRef(null);

  const togglePanel = () => {
    setpanelOpen(true);
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
        });
        gsap.to(panelArrowRef.current, {
          opacity: "1",
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
        });
        gsap.to(panelArrowRef.current, {
          opacity: "0",
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

  return (
    <>
      <div className="h-screen relative overflow-hidden">
        <img
          className="w-20 absolute left-5 top-5"
          src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
          alt=""
        />
        <div className="h-screen w-screen">
          <img
            className="object-cover h-full w-full"
            src="https://i0.wp.com/www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png?fit=493%2C383&ssl=1"
            alt=""
          />
        </div>
        <div className="flex flex-col justify-end h-screen absolute w-full top-0">
          <div className="h-[30%] bg-white  p-5 relative">
            <div
              ref={panelArrowRef}
              onClick={() => {
                setpanelOpen(false);
              }}
              className="cursor-pointer opacity-0 absolute h-6 w-6 top-6 right-5"
            >
              <IoIosArrowDown />
            </div>
            <h4 className="text-2xl font-semibold">Find a trip</h4>
            <form onSubmit={submitHandler}>
              <div className="absolute h-16 w-1 top-[43%] left-10 bg-gray-700 rounded-full"></div>
              <input
                className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
                type="text"
                name="pickup"
                onClick={() => {
                  togglePanel();
                }}
                id=""
                placeholder="Add your Pickup Location"
                onChange={handleChange}
                value={formValues.pickup}
              />
              <input
                className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
                type="text"
                name="dropooff"
                onClick={() => {
                  togglePanel();
                }}
                id=""
                placeholder="Add your Dropoff Location"
                onChange={handleChange}
                value={formValues.dropooff}
              />
            </form>
          </div>
          <div ref={panelRef} className="h-0 bg-white">
            <LocationPannel
              vehiclePanel={vehiclePanel}
              setVehiclePanel={setVehiclePanel}
            />
          </div>
        </div>
        <div
          ref={vehiclePanelRef}
          className="w-full fixed z-10 bottom-0 bg-white px-3 py-10 pt-14 translate-y-full"
        >
        <VehiclePannel setVehiclePanel={setVehiclePanel}/>
        </div>
      </div>
    </>
  );
};

export default Home;
