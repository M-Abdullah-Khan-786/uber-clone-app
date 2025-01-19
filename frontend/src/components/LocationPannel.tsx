import { CiLocationOn } from "react-icons/ci";

interface LocationPannelProps {
  setVehiclePanel: React.Dispatch<React.SetStateAction<boolean>>;
  setpanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  suggestions: string[];
  setformValues: React.Dispatch<React.SetStateAction<{ pickup: string; dropooff: string }>>;
  inputType: "pickup" | "dropooff";
}

const LocationPannel: React.FC<LocationPannelProps> = ({
  setpanelOpen,
  setVehiclePanel,
  suggestions,
  setformValues,
  inputType,
}) => {
  const handleSuggestionClick = (location: string) => {
    setformValues((prevValues) => ({
      ...prevValues,
      [inputType]: location,
    }));
    setpanelOpen(false);
    setVehiclePanel(true);
  };

  return (
    <div>
      {suggestions.map((location: string, index: number) => (
        <div
          key={index}
          className="flex items-center justify-start gap-3 my-2 border-2 border-gray-50 active:border-black rounded-lg p-3"
          onClick={() => handleSuggestionClick(location)}
        >
          <h2 className="bg-[#eee] h-7 w-7 rounded-full flex items-center justify-center">
            <CiLocationOn />
          </h2>
          <h4 className="font-medium">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationPannel;
