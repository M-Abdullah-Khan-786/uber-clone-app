import "./App.css"
import { Routes, Route } from "react-router-dom"
import UserLogin from "./pages/UserLogin"
import UserSignUp from "./pages/UserSignUp"
import DriverLogin from "./pages/DriverLogin"
import DriverSignUp from "./pages/DriverSignUp"
import Start from "./pages/Start"
import Home from "./pages/Home"

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/home" element={<Home />} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/user-signup" element={<UserSignUp/>} />
      <Route path="/driver-login" element={<DriverLogin />} />
      <Route path="/driver-signup" element={<DriverSignUp/>} />

    </Routes>
    </>
  )
}

export default App