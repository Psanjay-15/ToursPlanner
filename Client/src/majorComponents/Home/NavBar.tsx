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

  const getEmailInitial = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <div className="flex flex-row justify-between items-center h-auto py-2 px-3">
      <Link to="/">
        <div>
          <p className="font-bold text-2xl md:text-3xl bg-gradient-to-tr from-red-700 to-orange-200 bg-clip-text text-transparent">
            <span className="md:hidden">TE</span>
            <span className="hidden md:inline">TripEzz.</span>
          </p>
        </div>
      </Link>
      <div>
        {email ? (
          <div
            className="text-[18px] border-2 border-gray-400 px-[15px] py-[4px] rounded-lg font-bold bg-gradient-to-tr from-red-700 to-orange-200 bg-clip-text text-transparent mr-4 cursor-pointer  "
            onClick={toggleMenu}
          >
            <span className="md:hidden">{getEmailInitial(email)}</span>
            <span className="hidden md:inline">{email}</span>
          </div>
        ) : (
          <div className="flex items-center">
            <Link to={"/register"}>
              <button className="mr-1 text-[16px] md:text-[18px] font-bold bg-gradient-to-tr from-red-700 to-orange-200 bg-clip-text text-transparent hover:border-b-2 border-orange-200">
                Sign Up
              </button>
            </Link>
            <span className="bg-gradient-to-tr from-red-700 to-orange-200 bg-clip-text text-transparent text-[16px] md:text-[18px]">
              /
            </span>
            <Link to={"/login"}>
              <button className="ml-1 text-[16px] md:text-[18px] font-bold bg-gradient-to-tr from-red-700 to-orange-200 bg-clip-text text-transparent hover:border-b-2 border-orange-200">
                Sign In
              </button>
            </Link>
          </div>
        )}

        {menuOpen && (
          <div className="absolute mt-2 w-[120px] bg-white border border-gray-300 rounded shadow-md">
            <ul className="py-2">
              <li
                className="px-2 py-2 font-semibold hover:bg-gray-100 cursor-pointer"
                onClick={handleSignout}
              >
                Logout
              </li>
              <Link to={"/profile"}>
                <li className="px-2 py-2 font-semibold hover:bg-gray-100 cursor-pointer">
                  Profile
                </li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
