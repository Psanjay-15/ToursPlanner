import { Link } from "react-router-dom";
const NavBar = () => {
  return (
      <>
        <div className="flex flex-row justify-between items-center border h-auto">
              <div>
                <p className="font-bold text-3xl px-4 py-2 bg-gradient-to-tr from-red-700  to-orange-200 bg-clip-text text-transparent">TripEzz.</p>
              </div> 
              <div>
                <div>
                <Link to={"/register"}>
                <button className="home mr-2 text-[18px] font-bold w-fit text-right bg-gradient-to-tr from-red-700  to-orange-200 bg-clip-text text-transparent hover:border-b-2 border-orange-200">
                    Sign Up
                </button>

                <span className=" bg-gradient-to-tr from-red-700  to-orange-200 bg-clip-text text-transparent text-[18px]">/</span>
                </Link>

                <Link to={"/login"}>
                <button className="home ml-2 mr-6 text-[18px] font-bold w-fit text-left bg-gradient-to-tr from-red-700  to-orange-200 bg-clip-text text-transparent hover:border-b-2 border-orange-200">
                    Sign In
                </button>
                </Link>
                  </div>
              </div> 
        </div>
    </>
  )
}

export default NavBar
