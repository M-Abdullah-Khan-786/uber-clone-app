import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 w-full flex flex-col justify-between bg-red-400">
        <img className="w-24 ml-8" src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="uber" />
        <div className="bg-white p-4 pb-7">
          <h2 className="text-3xl font-bold">Get Started with UBER</h2>
          <Link to="/user-login" className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5">Continue</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
