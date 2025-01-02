import "./App.css"
import { Routes, Route } from "react-router-dom"
import UserLogin from "./pages/UserLogin"
import UserSignUp from "./pages/UserSignUp"
import DriverLogin from "./pages/DriverLogin"
import DriverSignUp from "./pages/DriverSignUp"
import Start from "./pages/Start"
import Home from "./pages/Home"
import CaptainHome from "./pages/DriverHome"
import PrivateRoute from "./utils/PrivateRoute"
import Riding from "./pages/Riding"

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/user-signup" element={<UserSignUp/>} />
      <Route path="/driver-login" element={<DriverLogin />} />
      <Route path="/driver-signup" element={<DriverSignUp/>} />
      <Route path="/riding" element={<Riding />} />
      <Route
        path="/home"
        element={<PrivateRoute element={<Home />} />}
      />
      <Route
        path="/captain-home"
        element={<PrivateRoute element={<CaptainHome />} />}
      />
    </Routes>
    </>
  )
}

export default App