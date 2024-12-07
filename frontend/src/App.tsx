import { Routes, Route } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import UserLogin from "./pages/UserLogin"
import UserSignUp from "./pages/UserSignUp"
import DriverLogin from "./pages/DriverLogin"
import DriverSignUp from "./pages/DriverSignUp"

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/user-signup" element={<UserSignUp/>} />
      <Route path="/driver-login" element={<DriverLogin />} />
      <Route path="/driver-signup" element={<DriverSignUp/>} />

    </Routes>
    </>
  )
}

export default App