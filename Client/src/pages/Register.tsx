import { Link } from "react-router-dom";
import ShinyButton from "../components/magicui/shiny-button";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [fullName, setFullName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  const handleRegister = (): void => {
    if (!fullName || !userName || !email || !password) {
      alert("Please enter all the details");
      return;
    }
    axios
      .post(
        BASE_URL + "/users/register",
        {
          fullName,
          userName,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        localStorage.setItem("accessToken", res.data.data.accessToken);
        localStorage.setItem("userName", res.data.data.createdUser.userName);
        localStorage.setItem("email", res.data.data.createdUser.email);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.message);
        // alert("Unable to register");
        toast.error("Please provide correct login details", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  const handleSignInWithGoogle = () => {
    window.open(BASE_URL + "/users/auth/google");
  };

  return (
    <>
      <div className="flex flex-row h-screen max-sm:flex-col">
        <div className="w-2/4 flex items-center justify-center max-sm:w-full">
          <div className="w-3/5 flex flex-col items-center max-sm:w-4/5">
            <p className="text-center font-bold text-3xl py-4 text-black max-sm:text-2xl">
              Create Account
            </p>
            <ShinyButton
              text="SIGN IN WITH GOOGLE"
              className="flex flex-row w-[50%] text-indigo-900 justify-center Montserrat border-2 rounded-full py-2 text-xs font-semibold hover:bg-indigo-100 hover:border-blue-950 max-sm:w-full"
              onClick={handleSignInWithGoogle}
            >
              <img
                className="h-4 w-4"
                src={"/media/google.png"}
                alt="Google Icon"
              />
              SIGN UP WITH GOOGLE
            </ShinyButton>
            <span className="flex justify-center mt-4 text-[16px] text-black">
              or Use your email for registration
            </span>
            <div className="flex flex-col w-[70%] text-[15px] max-sm:w-full">
              <input
                className="border-[1px] py-[10px] rounded-lg p-2 bg-slate-50 mt-4 my-2"
                placeholder="Name"
                type="text"
                required
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                className="border-[1px] py-[10px] rounded-lg p-2 bg-slate-50 mt-4 my-2"
                placeholder="Username"
                type="text"
                required
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                className="border-[1px] py-[10px] rounded-lg p-2 bg-slate-50 mt-4 my-2"
                placeholder="Email"
                type="text"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="border-[1px] py-[10px] rounded-lg p-2 bg-slate-50 mt-4 my-2"
                placeholder="Password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-full my-[20px] flex flex-col items-center">
              <ShinyButton
                text="Create an Account"
                className="flex flex-row w-[50%] text-gray-900 justify-center bg-orange-100 Montserrat border-2 rounded-full py-2 text-l font-semibold hover:bg-orange-200 hover:border-orange-250 max-sm:w-full"
                onClick={handleRegister}
              >
                Create an Account
              </ShinyButton>
            </div>
            <div className="flex justify-center pt-2 text-l">
              <p>
                Already have an Account?{" "}
                <Link to={"/login"}>
                  <span className="text-blue-900 text-[15px] cursor-pointer">
                    SIGN IN
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="w-2/4 flex items-center justify-center bg-[url('/media/lg.jpg')] bg-cover max-sm:hidden"></div>
      </div>
    </>
  );
};

export default Register;
