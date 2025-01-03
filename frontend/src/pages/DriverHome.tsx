import { RiLogoutCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import DriverDetails from "../components/DriverDetails";
import RidePopupPannel from "../components/RidePopupPannel";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const DriverHome = () => {
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);

  const confirmRidePanelRef = useRef(null);

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  return (
    <>
      <div className="h-screen">
        <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
          <img
            className="w-16"
            src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
            alt=""
            onClick={()=>{
              setConfirmRidePanel(true)
            }}
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
        <div
          ref={confirmRidePanelRef}
          className="w-full fixed z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14 "
        >
          <RidePopupPannel setConfirmRidePanel={setConfirmRidePanel} />
        </div>
      </div>
    </>
  );
};
export default DriverHome;
