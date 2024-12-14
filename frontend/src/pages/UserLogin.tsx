import { Link } from "react-router-dom";

const UserLogin = () => {
  return (
    <>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img
            className="w-24 mb-10"
            src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
            alt="uber"
          />
          <form action="">
            <h3 className="text-lg font-medium mb-2">What's your email</h3>
            <input
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full border text-lg placeholder:text-base"
              required
              type="email"
              placeholder="example@gmail.com"
            />
            <h3 className="text-lg font-medium mb-2">What's your password</h3>
            <input
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full border text-lg placeholder:text-base"
              required
              type="password"
              placeholder="********"
            />
            <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
              Login
            </button>
            <p className="text-center">New here? <Link to="/user-signup" className="text-blue-600">Create new Account</Link></p>
          </form>
        </div>
        <div>
        <Link to="/driver-login" className="flex items-center justify-center w-full bg-[#10b461] text-white py-3 rounded mt-2">Sign In as Driver</Link>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
