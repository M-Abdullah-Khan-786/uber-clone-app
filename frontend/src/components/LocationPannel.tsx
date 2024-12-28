import { CiLocationOn } from "react-icons/ci"

interface LocationPannelProps {
    vehiclePanel: boolean;
    setVehiclePanel: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const locations = [
    "Example Address",
    "Example Address",
    "Example Address",
    "Example Address"
  ]
  

  const LocationPannel: React.FC<LocationPannelProps> = ({ vehiclePanel, setVehiclePanel }) => {
  return (
    <div>
         {locations.map((e: string, index: number) => (
        <div
          key={index}
          className="flex items-center justify-start gap-3 my-2 border-2 border-gray-50 active:border-black rounded-lg p-3"
          onClick={()=>{
            setVehiclePanel(true)
          }}
        >
          <h2 className="bg-[#eee] h-7 w-7 rounded-full flex items-center justify-center">
            <CiLocationOn />
          </h2>
          <h4 className="font-medium">{e}</h4>
        </div>
      ))}
    </div>
  )
}

export default LocationPannel