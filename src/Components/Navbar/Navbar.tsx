import { useSelector} from "react-redux";
import {  RootState } from "../Redux/Redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Navbar = () => {
  // const token = useSelector((state: RootState) => state.app.token);
  const cartDetails = useSelector((state: RootState) => state.app.cartDetails);
  // const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  // const [isSignedout, setIsSignedout] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleSignOut = () => {
    Cookies.remove("token");
    // setIsSignedout(true);
    navigate("/home");
    
  };

  return (
    <div className="w-full p-2 bg-slate-200/60 flex justify-center items-center z-40 dark:bg-[#363636]">
      <div className="w-11/12  p-3 flex sm:flex-row sm:justify-between sm:items-center flex-col justify-center items-between  ">
        <div className="flex items-center">
          <NavLink to="home">
            <div className="logo text-xl font-bold me-5 dark:text-white">
              Logo
            </div>
          </NavLink>

          {Cookies.get("token") && (
            <button
              className="my-2 sm:my-0 mx-2 px-2 py-1 bg-slate-300/20  hover:bg-slate-300/35  opacity-0 sm:opacity-100  dark:text-white font-semibold  text-black  rounded  transition-colors"
              onClick={handleSignOut}
            >
              SignOut
            </button>
          )}
        </div>

        <div className="sm:hidden absolute right-2 top-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black focus:outline-none"
          >
            <svg
              className="w-6 h-6 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M4 6h16M4 12h16m-7 6h7" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } sm:flex sm:flex-row w-full sm:w-auto mt-3 sm:mt-0`}
        >
          <ul className="flex flex-col sm:flex-row justify-around items-center w-full sm:w-auto">
            {!Cookies.get("token") ? (
              <>
                <NavLink
                  className="my-2 sm:my-0 mx-2 px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
                  to="/signup"
                >
                  SignUp
                </NavLink>
                <NavLink
                  className="my-2 sm:my-0 mx-2 px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600 transition-colors"
                  to="/signin"
                >
                  SignIn
                </NavLink>
                <button
                  className="relative inline-block w-10 h-6 cursor-pointer"
                  onClick={toggleDarkMode}
                >
                  <input
                    type="checkbox"
                    className="opacity-0 w-full"
                    checked={darkMode}
                    id="toggle"
                    readOnly
                  />
                  <label
                    htmlFor="toggle"
                    className={`absolute cursor-pointer inset-0 rounded-full transition-colors ${
                      darkMode ? "bg-[#808080]" : "bg-[#272727]"
                    }`}
                  ></label>
                  <span
                    className={`dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition transform ${
                      darkMode ? "translate-x-full" : ""
                    }`}
                  ></span>
                </button>
              </>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row items-center justify-center w-full">
                  <button
                    className="relative inline-block w-10 h-6 cursor-pointer"
                    onClick={toggleDarkMode}
                  >
                    <input
                      type="checkbox"
                      className="opacity-0 w-full"
                      checked={darkMode}
                      id="toggle"
                      readOnly
                    />
                    <label
                      htmlFor="toggle"
                      className={`absolute cursor-pointer inset-0 rounded-full transition-colors ${
                        darkMode ? "bg-[#808080]" : "bg-[#272727]"
                      }`}
                    ></label>
                    <span
                      className={`dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition transform ${
                        darkMode ? "translate-x-full" : ""
                      }`}
                    ></span>
                  </button>
                  <button
                    className="my-2 sm:my-0 mx-2 px-2 py-1 bg-slate-300/20 hover:bg-slate-300/35  visible sm:hidden dark:text-white font-semibold  text-black  rounded  transition-colors"
                    onClick={handleSignOut}
                  >
                    SignOut
                  </button>
                  <NavLink
                    className="my-2 px-2 py-1 bg-slate-300/20 hover:bg-slate-300/35  sm:my-0 mx-2 text-black font-semibold dark:text-white transition-colors"
                    to="/wishlist"
                  >
                    Wishlist
                  </NavLink>
                  <NavLink
                    className="my-2 sm:my-0 px-2 py-1 bg-slate-300/20 hover:bg-slate-300/35 text-black font-semibold dark:text-white transition-colors"
                    to="/allorders"
                  >
                    All Orders
                  </NavLink>
                  <NavLink
                    className="my-2 sm:my-0 mx-2 px-2 py-1 bg-slate-300/20 hover:bg-slate-300/35 text-black dark:text-white font-semibold  transition-colors"
                    to="/home"
                  >
                    Home
                  </NavLink>
                  <NavLink className="my-2 sm:my-0 mx-2 relative" to="/cart">
                    <div className="relative text-white">
                      <FontAwesomeIcon
                        className="text-2xl dark:text-[#c7c6c6] dark:hover:text-[#ffffff] text-gray-800 hover:text-gray-600 transition-colors"
                        icon={faCartShopping}
                      />
                      {cartDetails && (
                        <div className="absolute -top-2 -right-2 w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center">
                          {cartDetails.products.length}
                        </div>
                      )}
                    </div>
                  </NavLink>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
