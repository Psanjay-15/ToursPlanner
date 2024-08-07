import { Link } from "react-router-dom";
import ShinyButton from "../components/magicui/shiny-button";

const Register = () => {
  
  return (
    <>
      <div className="flex flex-row h-screen ">
       
        <div className="w-2/4 borde  flex items-center justify-center"> 
          <div className="w-3/5  bg-slate- h-4/6 flex flex-col items-center ">      
            <p className="text-center font-bold text-3xl py-4 text-black max-sm:text-2xl max-sm:px">Create Account</p>
             <ShinyButton 
                text="SIGN IN WITH GOOGLE" 
                className="flex flex-row w-[50%] text-indigo-900 justify-center Montserrat border-2 rounded-full py-2 text-xs font-semibold hover:bg-indigo-100 hover:border-blue-950 max-sm:text-[10px]"
              >
                <img className="h-4 w-4" src={"/media/google.png"} alt="Google Icon" />
                SIGN IN WITH GOOGLE
             </ShinyButton>
            <span className="flex justify-center mt-4 text-[16px] text-black ">
                or Use your email for registration
            </span>
            <div className="flex flex-col w-[70%] text-[15px] max-sm:px-0">
                <input
                  className="fullname border-[1px] py-[10px] rounded-lg p-2 bg-slate-50 mt-4 my-2 max-sm:pr-20 "
                  placeholder="Name"
                  type="text"
                  required
                />
                <input
                  className="username border-[1px] py-[10px] rounded-lg p-2 bg-slate-50 mt-4 my-2 max-sm:pr-20"
                  placeholder="Username"
                  type="text"
                  required
                />
                <input
                  className="email border-[1px] py-[10px] rounded-lg p-2 bg-slate-50 mt-4 my-2 max-sm:pr-20"
                  placeholder="Email"
                  type="text"
                  required
                />
                <input
                  className="password border-[1px] py-[10px] rounded-lg p-2 bg-slate-50 mt-4 my-2 max-sm:pr-20"
                  placeholder="Password"
                  type="password"
                  required
                />
            </div>
            <div className="w-full my-[20px]  flex flex-col items-center ">
             <ShinyButton 
                text="Create an Account" 
                className="flex flex-row w-[50%] text-gray-900 justify-center bg-orange-100  Montserrat  border-2 rounded-full py-2 text-l font-semibold hover:bg-orange-200 hover:border-orange-250 max-sm:text-[10px]"
              >
                {/* <img className="h-4 w-4" src={google} alt="Google Icon" /> */}
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


        <div className="w-2/4 flex items-center justify-center bg-[url('/media/lg.jpg')] bg-cover  ">
          
        </div>
      </div>
    </>
  )
}

export default Register
