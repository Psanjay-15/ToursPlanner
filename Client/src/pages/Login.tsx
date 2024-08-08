import { Link } from "react-router-dom";
import ShinyButton from "../components/magicui/shiny-button";
import { useState } from "react";
import axios from "axios"
// import { toast } from "react-toastify";

const Register = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const [userName, setUserName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")


  const handleLogin = ():void => {
    if (!userName || !email || !password) {
      alert("All the fields are required")
      // toast.error("All the fields are required")
      return;
    }

    axios.post(BASE_URL + "/users/auth", {
      userName,email,password
    },
    {
        withCredentials:true,
    }
    ).then((res) => {
      sessionStorage.setItem("userName",res.data.data.user.userName)
      sessionStorage.setItem("email", res.data.data.user.email)
      window.location.href="/"
      console.log(res);
      // toast.success("Login successfully")
    }).catch((error) => {
      console.log(error)
      // toast.error("Unable to login at this moment")
    })
  }

  return (
    <>
      <div className="flex flex-row h-screen ">
       
        <div className="w-2/4 borde  flex items-center justify-center"> 
          <div className="w-3/5  bg-slate- h-4/6 flex flex-col items-center ">      
            <p className="text-center font-bold text-3xl py-4 text-black max-sm:text-2xl max-sm:px">Login Account</p>
             <ShinyButton 
                text="SIGN IN WITH GOOGLE" 
                className="flex flex-row w-[50%] text-indigo-900 justify-center Montserrat border-2 rounded-full py-2 text-xs font-semibold hover:bg-indigo-100 hover:border-blue-950 max-sm:text-[10px]"
              >
                <img className="h-4 w-4" src={"/media/google.png"} alt="Google Icon" />
                SIGN UP WITH GOOGLE
             </ShinyButton>
            <span className="flex justify-center mt-4 text-[16px] text-black ">
                or Use your email for Login
            </span>
            <div className="flex flex-col w-[70%] text-[15px] max-sm:px-0">
                <input
                  className="username border-[1px] py-[10px] rounded-lg p-2 bg-slate-50 mt-4 my-2 max-sm:pr-20"
                  placeholder="Username"
                  type="text"
                  required
                  onChange={(e)=>setUserName(e.target.value)}
                />
                <input
                  className="email border-[1px] py-[10px] rounded-lg p-2 bg-slate-50 mt-4 my-2 max-sm:pr-20"
                  placeholder="Email"
                  type="text"
                  required
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                  className="password border-[1px] py-[10px] rounded-lg p-2 bg-slate-50 mt-4 my-2 max-sm:pr-20"
                  placeholder="Password"
                  type="password"
                  required
                  onChange={(e)=>setPassword(e.target.value)}
                
                />
            </div>
            <div className="w-full my-[20px]  flex flex-col items-center ">
             <ShinyButton 
                text="Create an Account" 
                className="flex flex-row w-[50%] text-gray-900 justify-center bg-orange-100  Montserrat  border-2 rounded-full py-2 text-l font-semibold hover:bg-orange-200 hover:border-orange-250 max-sm:text-[10px]"
                onClick={handleLogin}
              >
                {/* <img className="h-4 w-4" src={google} alt="Google Icon" /> */}
                Login 
             </ShinyButton>
            </div>
             <div className="flex justify-center pt-2 text-l">
                <p>
                  Don't have an Account?{" "}
                  <Link to={"/register"}>
                    <span className="text-blue-900 text-[15px] cursor-pointer" >
                      SIGN UP
                    </span>
                  </Link>
                </p>
              </div>
          </div>
        </div>

        <div className="w-2/4 flex items-center justify-center bg-[url('/media/lg.jpg')] bg-cover">
        </div>
              
      </div>
    </>
  )
}

export default Register
