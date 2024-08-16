import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [email, setEmail] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);

  const handleSignout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex flex-row justify-between items-center h-auto py-2">
      <Link to="/">
        <div>
          <p className="font-bold text-3xl px-4 py-2 bg-gradient-to-tr from-red-700 to-orange-200 bg-clip-text text-transparent">
            TripEzz.
          </p>
        </div>
      </Link>
      <div>
        {email ? (
          <div
            className="text-[18px] border-2 border-gray-400 px-[15px] py-[4px] rounded-lg font-bold bg-gradient-to-tr from-red-700 to-orange-200 bg-clip-text text-transparent mr-6"
            onClick={toggleMenu}
          >
            {email}
          </div>
        ) : (
          <div>
            <Link to={"/register"}>
              <button className="home mr-2 text-[18px] font-bold w-fit text-right bg-gradient-to-tr from-red-700 to-orange-200 bg-clip-text text-transparent hover:border-b-2 border-orange-200">
                Sign Up
              </button>
              <span className="bg-gradient-to-tr from-red-700 to-orange-200 bg-clip-text text-transparent text-[18px]">
                /
              </span>
            </Link>

            <Link to={"/login"}>
              <button className="home ml-2 mr-6 text-[18px] font-bold w-fit text-left bg-gradient-to-tr from-red-700 to-orange-200 bg-clip-text text-transparent hover:border-b-2 border-orange-200">
                Sign In
              </button>
            </Link>
          </div>
        )}

        {menuOpen && (
          <div className="absolute  mt-2 w-[150px] bg-white border border-gray-300 rounded shadow-md">
            <ul className="py-2">
              <li
                className="px-2 py-2 font-semibold hover:bg-gray-100 cursor-pointer"
                onClick={handleSignout}
              >
                Logout
              </li>
              <li className="px-2 py-2 font-semibold hover:bg-gray-100 cursor-pointer">
                Profile
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
