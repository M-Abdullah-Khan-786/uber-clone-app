import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { loginExistingUser } from "../app/features/user/userSlice";

const UserLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { status } = useAppSelector((state) => state.user);

  const [formValues, setFormValues] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await dispatch(loginExistingUser(formValues)).unwrap();
      toast.success(response.message);
      localStorage.setItem("token", response.token);
      navigate("/home");
    } catch (err) {
      toast.error(err as string);
    } finally {
      setFormValues({ email: "", password: "" });
    }
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
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full border text-lg placeholder:text-base"
            value={formValues.email}
            name="email"
            required
            type="email"
            placeholder="example@gmail.com"
            onChange={handleInputChange}
          />
          <h3 className="text-lg font-medium mb-2">What's your password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full border text-lg placeholder:text-base"
            required
            value={formValues.password}
            name="password"
            type="password"
            placeholder="********"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            disabled={status === "loading"}
          >
            Login
          </button>
          <p className="text-center">
            New here?{" "}
            <Link to="/user-signup" className="text-blue-600">
              Register as a User
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/driver-login"
          className="flex items-center justify-center w-full mb-5 bg-[#10b461] text-white py-3 rounded mt-2"
        >
          Sign In as Driver
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
