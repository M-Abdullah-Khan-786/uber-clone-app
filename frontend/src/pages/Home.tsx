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
import { createRide, getFareEstimate } from "../app/features/ride/rideService";
import { RiLogoutCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../app/features/user/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { resetUser } from "../app/features/user/userSlice";
import { useEffect, useContext } from "react";
import { SocketContext } from "../context/socketContext";
import LiveTracking from "../components/LiveTracking";
const Home = () => {
  const dispatch = useAppDispatch();

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
  const [fareEstimate, setFareEstimate] = useState<any>(null);
  const [vehicleType, setVehicleType] = useState<any>(null);
  const [rideData, setRideData] = useState(null);

  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);
  const { _id } = useAppSelector((state) => state.user);

  useEffect(() => {
    socket.emit("join", {
      userId: _id,
      userType: "user",
    });
  }, [_id]);

  socket.on("ride-confirmed", (ride: any) => {
    setLookingDriverPannel(false);
    setWaitingForDriverPannel(true);
    setRideData(ride);
  });

  socket.on("ride-started", (ride: any) => {
    setWaitingForDriverPannel(false);
    navigate("/riding", { state: { ride } });
  });

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
  const findTrip = async () => {
    setpanelOpen(false);
    setVehiclePanel(true);
    try {
      const fareData = await getFareEstimate(
        formValues.pickup,
        formValues.dropooff
      );
      setFareEstimate(fareData);
    } catch (error) {
      console.error("Error fetching fare estimate:", error);
    }
  };

  const handleCreateRide = async () => {
    try {
      const response = await createRide(
        formValues.pickup,
        formValues.dropooff,
        vehicleType
      );
      if (response) {
        toast.success(response.message);
      }
    } catch (error) {
      console.error("Error creating ride:", error);
    }
  };

  // Form submission handler
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response) {
        localStorage.removeItem("token");
        navigate("/user-login");
        toast.success(response.message);
        dispatch(resetUser());
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="h-screen relative overflow-hidden">
        <div className="fixed p-6 top-0 z-[50] flex items-center justify-between w-screen">
          <img
            className="w-16"
            src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
            alt=""
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLogout();
            }}
            className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
          >
            <RiLogoutCircleFill className="text-2xl font-medium" />
          </button>
        </div>
        <div className="h-screen w-screen">
          <LiveTracking />
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
            fareEstimate={fareEstimate}
            setVehicleType={setVehicleType}
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
            handleCreateRide={handleCreateRide}
            fareEstimate={fareEstimate}
            vehicleType={vehicleType}
            formValues={formValues}
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
            rideData={rideData}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
