import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "./components/Footer/Footer";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

function App() {
  const [toggleIcon, setToggleIcon] = useState(false);

  const handleClick = () => {
    setToggleIcon(!toggleIcon);
  };

  return (
    <div className="flex gap-10 w-full min-h-screen px-1 sm:px-5 md:px-0">
      <div id="left container" className="hidden md:block min-h-full">
        <Sidebar />
      </div>
      <div id="right-container" className="flex flex-col w-full min-h-full">
        <div className="w-full flex items-center gap-1 sm:gap-5">
          <div onClick={handleClick} className="md:hidden">
            {toggleIcon ? (
              ""
            ) : (
              <GiHamburgerMenu className=" font-semibold text-3xl" />
            )}
          </div>
          <div
            className={`md:hidden z-50 top-0 left-0 fixed w-full bg-white ${
              toggleIcon ? " block " : " hidden"
            }`}
          >
            <div className="flex ml-1 sm:ml-5 mt-8">
              <IoClose className="text-3xl" onClick={handleClick} />
            </div>
            <div className=" flex items-center justify-center">
              <Sidebar />
            </div>
          </div>
          <Navbar />
        </div>
        <div>
          <Outlet />
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
