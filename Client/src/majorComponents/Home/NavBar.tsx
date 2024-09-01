import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NavBar = () => {
  const [email, setEmail] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [, setuserName] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);

  // useEffect(() => {
  //   const userName = localStorage.getItem("userName");
  //   if (userName) {
  //     setuserName(userName);
  //   }
  // }, []);

  const handleSignout = () => {
    localStorage.clear();
    toast.success("Successfully Logout", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // const getEmailInitial = (email: string) => {
  //   return email.charAt(0).toUpperCase();
  // };

  return (
    <div className="flex flex-row justify-between items-center h-auto py-2 lg:pb-6 px-3 relative">
      <Link to="/">
        <p className="font-bold text-2xl md:text-3xl bg-gradient-to-tr from-red-700 to-orange-200 bg-clip-text text-transparent">
          <span className="md:hidden">TE</span>
          <span className="hidden md:inline">TripEzz.</span>
        </p>
      </Link>
      <div className="relative">
        {email ? (
          <div
            className="flex items-center text-[18px] py-[4px] rounded-full lg:rounded-lg font-bold lg:mx-[26px] max-sm:mr-[0px] cursor-pointer"
            onClick={toggleMenu}
          >
            <img
              src={"/media/profile.png"}
              className="w-10 h-10 max-sm:w-[35px] max-sm:h-[35px]"
              alt=""
            />
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
          <div className="absolute max-sm:z-10 top-12 right-0 w-[100px] bg-white border border-gray-300 rounded shadow-md mx-w-full overflow-hiddn">
            <ul className="py-2">
              <Link to={"/mytours"}>
                <li className="pl-4 py-2 font-semibold hover:bg-gray-100 cursor-pointer">
                  My Tours
                </li>
              </Link>
              <Link to={"/update"}>
                <li className="pl-4 py-2 font-semibold hover:bg-gray-100 cursor-pointer">
                  Update
                </li>
              </Link>
              <li
                className="pl-4 py-2 font-semibold hover:bg-gray-100 cursor-pointer"
                onClick={handleSignout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
