import { RiLogoutCircleFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import DriverDetails from "../components/DriverDetails";
import RidePopupPannel from "../components/RidePopupPannel";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopupPannel from "../components/ConfirmRidePopupPannel";
import { logoutDriver } from "../app/features/driver/driverService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "../app/hook";
import { resetDriver } from "../app/features/driver/driverSlice";

const DriverHome = () => {
    const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [RidePopUPPanel, setRidePopUPPanel] = useState(true);
  const [confirmRidePopUPPanel, setConfirmRidePopUPPanel] = useState(false);

  const RidePopUPPanelRef = useRef(null);
  const confirmRidePopUPPanelRef = useRef(null);

  const handleLogout = async () => {
    try {
      const response = await logoutDriver();
      if (response) {
        localStorage.removeItem("token");
        navigate("/driver-login");
        toast.success(response.message);
        dispatch(resetDriver())
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useGSAP(
    function () {
      if (RidePopUPPanel) {
        gsap.to(RidePopUPPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(RidePopUPPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [RidePopUPPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopUPPanel) {
        gsap.to(confirmRidePopUPPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopUPPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopUPPanel]
  );

  return (
    <>
      <div className="h-screen">
        <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
          <img
            className="w-16"
            src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
            alt=""
            onClick={() => {
              setRidePopUPPanel(true);
            }}
          />
          <Link
            to="/driver-login"
            className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
          >
            <RiLogoutCircleFill
              onClick={handleLogout}
              className="text-2xl font-medium"
            />
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
        <div
          ref={RidePopUPPanelRef}
          className="w-full fixed z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14 "
        >
          <RidePopupPannel
            setRidePopUPPanel={setRidePopUPPanel}
            setConfirmRidePopUPPanel={setConfirmRidePopUPPanel}
          />
        </div>
        <div
          ref={confirmRidePopUPPanelRef}
          className="w-full h-screen fixed z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14 "
        >
          <ConfirmRidePopupPannel
            setRidePopUPPanel={setRidePopUPPanel}
            setConfirmRidePopUPPanel={setConfirmRidePopUPPanel}
          />
        </div>
      </div>
    </>
  );
};
export default DriverHome;
