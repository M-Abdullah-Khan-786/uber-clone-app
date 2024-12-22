import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

const DriverSignUp = () => {
  const [formValues, setformValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    vehicleType: "",
    vehicleNumber: "",
    vehicleColor: "",
    vehicleCapacity: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValues);
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-24 mb-10"
          src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
          alt="uber"
        />
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-medium mb-2">What's your Name</h3>
          <div className="flex gap-5 mb-5">
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 border text-lg placeholder:text-base"
              value={formValues.firstname}
              name="firstname"
              required
              type="text"
              placeholder="First Name"
              onChange={handleInputChange}
            />
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 border text-lg placeholder:text-base"
              value={formValues.lastname}
              name="lastname"
              required
              type="text"
              placeholder="Last Name"
              onChange={handleInputChange}
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 w-full border text-lg placeholder:text-base"
            value={formValues.email}
            name="email"
            required
            type="email"
            placeholder="example@gmail.com"
            onChange={handleInputChange}
          />
          <h3 className="text-lg font-medium mb-2">What's your password</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 w-full border text-lg placeholder:text-base"
            required
            value={formValues.password}
            name="password"
            type="password"
            placeholder="********"
            onChange={handleInputChange}
          />
          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <div className="flex gap-5 mb-5">
            <select
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 border text-lg placeholder:text-base"
              value={formValues.vehicleType}
              name="vehicleType"
              required
              onChange={handleInputChange}
            >
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto-rickshaw">Auto Rickshaw</option>
            </select>
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 border text-lg placeholder:text-base"
              value={formValues.vehicleNumber}
              name="vehicleNumber"
              required
              type="text"
              placeholder="Vehicle Number"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-5 mb-5">
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 border text-lg placeholder:text-base"
              value={formValues.vehicleColor}
              name="vehicleColor"
              required
              type="text"
              placeholder="Vehicle Color"
              onChange={handleInputChange}
            />
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 border text-lg placeholder:text-base"
              value={formValues.vehicleCapacity}
              name="vehicleCapacity"
              required
              type="number"
              placeholder="Vehicle Capacity"
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base"
          >
            Create an Driver Account
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/user-login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/user-login"
          className="flex items-center justify-center w-full mb-5 bg-[#d5622d] text-white py-3 rounded mt-2"
        >
          Sign In as User
        </Link>
      </div>
    </div>
  );
};

export default DriverSignUp;
