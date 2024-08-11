import { Route, Routes } from "react-router-dom";
import Register from "../src/pages/Register.tsx";
import Login from "../src/pages/Login.tsx";
import Home from "../src/majorComponents/Home/Home.tsx";
import TourDetails from "../src/majorComponents/SharedComponents/TourDetails.tsx";
import Booking from "../src/majorComponents/SharedComponents/Booking.tsx";
const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/tour-details/:id" element={<TourDetails />} />
        <Route path="/payment" element={<Booking />} />
      </Routes>
    </>
  );
};

export default AppRouter;
