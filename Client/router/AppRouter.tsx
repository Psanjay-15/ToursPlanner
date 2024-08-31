import { Route, Routes } from "react-router-dom";
import Register from "../src/pages/Register.tsx";
import Login from "../src/pages/Login.tsx";
import Home from "../src/majorComponents/Home/Home.tsx";
import TourDetails from "../src/majorComponents/SharedComponents/TourDetails.tsx";
import SavedTours from "../src/majorComponents/SharedComponents/SavedTours.tsx";
import MyTours from "../src/pages/MyTours.tsx";
import Google from "../src/pages/Google.tsx";
import Update from "../src/pages/Update.tsx";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppRouter = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Callback functions to handle success messages
  const onProfileUpdateSuccess = (message: string) => {
    setSuccessMessage(message);
    // alert(`Profile Updated: ${message}`);
    toast.success(`${message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const onPasswordChangeSuccess = (message: string) => {
    setSuccessMessage(message);
    // alert(`Password Changed: ${message}`);
    toast.success(`${message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/tour-details/:id" element={<TourDetails />} />
        <Route path="/mytours" element={<MyTours />} />
        <Route path="/saved" element={<SavedTours />} />
        <Route
          path="/update"
          element={
            <Update
              onProfileUpdateSuccess={onProfileUpdateSuccess}
              onPasswordChangeSuccess={onPasswordChangeSuccess}
            />
          }
        />
        <Route path="/google/:token" element={<Google />}></Route>
      </Routes>
    </>
  );
};

export default AppRouter;
