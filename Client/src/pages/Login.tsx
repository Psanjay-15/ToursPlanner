import { Link } from "react-router-dom";
import ShinyButton from "../components/magicui/shiny-button";
import { useState } from "react";
import axios from "axios";
// import { toast } from "react-toastify";

const Login = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (): void => {
    if (!userName || !email || !password) {
      alert("All the fields are required");
      // toast.error("All the fields are required");
      return;
    }

    axios
      .post(
        BASE_URL + "/users/auth",
        {
          userName,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        localStorage.setItem("userName", res.data.data.user.userName);
        localStorage.setItem("accessToken", res.data.data.accessToken);
        localStorage.setItem("email", res.data.data.user.email);
        window.location.href = "/";
        console.log(res.data);
        // toast.success("Login successfully");
      })
      .catch((error) => {
        console.log(error);
        // toast.error("Unable to login at this moment");
      });
  };
  const handleSignInWithGoogle = () => {
    window.open(BASE_URL + "/users/auth/google");
  };
  return (
    <>
      <div className="flex flex-row h-screen max-sm:flex-col">
        <div className="w-2/4 flex items-center justify-center max-sm:w-full max-sm:h-[80%]">
          <div className="w-3/5 h-4/6 flex flex-col items-center max-sm:w-[90%]">
            <p className="text-center font-bold text-3xl py-4 text-black max-sm:text-2xl">
              Login Account
            </p>
            <ShinyButton
              text="SIGN IN WITH GOOGLE"
              className="flex flex-row w-[50%] text-indigo-900 justify-center Montserrat border-2 rounded-full py-2 text-xs font-semibold hover:bg-indigo-100 hover:border-blue-950 max-sm:w-[70%]"
              onClick={handleSignInWithGoogle}
            >
              <img
                className="h-4 w-4"
                src={"/media/google.png"}
                alt="Google Icon"
              />
              SIGN IN WITH GOOGLE
            </ShinyButton>
            <span className="flex justify-center mt-4 text-[16px] text-black max-sm:text-[14px]">
              or Use your email for Login
            </span>
            <div className="flex flex-col w-[70%] text-[15px] max-sm:w-full max-sm:px-0">
              <input
                className="username border-[1px] py-[10px] rounded-lg p-2 bg-slate-50 mt-4 my-2"
                placeholder="Username"
                type="text"
                required
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                className="email border-[1px] py-[10px] rounded-lg p-2 bg-slate-50 mt-4 my-2"
                placeholder="Email"
                type="text"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="password border-[1px] py-[10px] rounded-lg p-2 bg-slate-50 mt-4 my-2"
                placeholder="Password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-full my-[20px] flex flex-col items-center">
              <ShinyButton
                text="Create an Account"
                className="flex flex-row w-[50%] text-gray-900 justify-center bg-orange-100 Montserrat border-2 rounded-full py-2 text-l font-semibold hover:bg-orange-200 hover:border-orange-250 max-sm:w-[60%]"
                onClick={handleLogin}
              >
                Login
              </ShinyButton>
            </div>
            <div className="flex justify-center pt-2 text-l">
              <p className="text-[15px] max-sm:text-[14px]">
                Don't have an Account?{" "}
                <Link to={"/register"}>
                  <span className="text-blue-900 cursor-pointer">SIGN UP</span>
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

export default Login;
