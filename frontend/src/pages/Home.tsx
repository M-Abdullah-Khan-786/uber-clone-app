import { FormEvent, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { IoIosArrowDown } from "react-icons/io";
import LocationPannel from "../components/LocationPannel";
import VehiclePannel from "../components/VehiclePannel";
import ConfrirmVehiclePannel from "../components/ConfrirmVehiclePannel";
import LookingForDriverPannel from "../components/LookingForDriverPannel";
import WaitingForDriverPannel from "../components/WaitingForDriverPannel";
import { getAutoCompleteSuggestions } from "../app/features/map/mapService";

const Home = () => {
  // State for managing panel visibility and form inputs
  const [panelOpen, setpanelOpen] = useState(false);
  const [formValues, setformValues] = useState({
    pickup: "",
    dropooff: "",
  });
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmVehiclePannel, setConfirmVehiclePannel] = useState(false);
  const [lookingDriverPannel, setLookingDriverPannel] = useState(false);
  const [waitingForDriverPannel, setWaitingForDriverPannel] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Refs for panel elements to control animations
  const panelRef = useRef(null);
  const panelArrowRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmVehiclePannelRef = useRef(null);
  const lookingDriverPannelRef = useRef(null);
  const waitingForDriverPannelRef = useRef(null);

  // Fetch suggestions for autocomplete
  const fetchSuggestions = async (input: string) => {
    try {
      const response = await getAutoCompleteSuggestions(input);
      setSuggestions(response.data || []);
    } catch (error: any) {
      console.error(error.message);
      setSuggestions([]);
    }
  };

  // Handle input changes and fetch suggestions if needed
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });

    if (name === "pickup" || name === "dropooff") {
      fetchSuggestions(value);
    }
  };

  // Toggle the main panel visibility
  const togglePanel = () => {
    setpanelOpen(true);
  };

  // GSAP animations for the main panel
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

  // GSAP animations for the vehicle selection panel
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

  // GSAP animations for the confirmation panel
  useGSAP(
    function () {
      if (confirmVehiclePannel) {
        gsap.to(confirmVehiclePannelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmVehiclePannelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmVehiclePannel]
  );

  // GSAP animations for the "Looking for driver" panel
  useGSAP(
    function () {
      if (lookingDriverPannel) {
        gsap.to(lookingDriverPannelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(lookingDriverPannelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [lookingDriverPannel]
  );

  // GSAP animations for the "Waiting for driver" panel
  useGSAP(
    function () {
      if (waitingForDriverPannel) {
        gsap.to(waitingForDriverPannelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverPannelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriverPannel]
  );

  // Triggered when "Confirm Location" is clicked
  const findTrip = () => {
    setpanelOpen(false);
    setVehiclePanel(true);
  };

  // Form submission handler
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

        {/* Main panel */}
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
              {/* Location input fields */}
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

            {/* Confirm location button */}
            {panelOpen && (
              <button
                onClick={findTrip}
                className="mt-3 w-full bg-black text-white font-semibold py-2 rounded-lg"
              >
                Confirm Location
              </button>
            )}
          </div>

          {/* Location suggestions panel */}
          <div ref={panelRef} className="h-0 bg-white">
            <LocationPannel
              setVehiclePanel={setVehiclePanel}
              setpanelOpen={setpanelOpen}
              suggestions={suggestions}
              setformValues={setformValues}
              inputType="pickup"
            />
          </div>
        </div>

        {/* Vehicle selection panel */}
        <div
          ref={vehiclePanelRef}
          className="w-full fixed z-10 bottom-0 bg-white px-3 py-10 pt-14 translate-y-full"
        >
          <VehiclePannel
            setConfirmVehiclePannel={setConfirmVehiclePannel}
            setVehiclePanel={setVehiclePanel}
          />
        </div>

        {/* Confirm vehicle panel */}
        <div
          ref={confirmVehiclePannelRef}
          className="w-full fixed z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full"
        >
          <ConfrirmVehiclePannel
            setConfirmVehiclePannel={setConfirmVehiclePannel}
            setLookingDriverPannel={setLookingDriverPannel}
          />
        </div>

        {/* Looking for driver panel */}
        <div
          ref={lookingDriverPannelRef}
          className="w-full fixed z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full"
        >
          <LookingForDriverPannel
            setLookingDriverPannel={setLookingDriverPannel}
          />
        </div>

        {/* Waiting for driver panel */}
        <div
          ref={waitingForDriverPannelRef}
          className="w-full fixed z-10 bottom-0 bg-white px-3 py-10 pt-12"
        >
          <WaitingForDriverPannel
            setWaitingForDriverPannel={setWaitingForDriverPannel}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
