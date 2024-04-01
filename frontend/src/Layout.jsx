import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "./components/Footer/Footer";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/useTheme";

function Layout() {
  const [toggleIcon, setToggleIcon] = useState(false);
  const [themeMode, setThemeMode] = useState("light")
  const lightTheme = () => {
    setThemeMode("light")
  }
  const darkTheme = () => {
    setThemeMode("dark")
  }

  const handleClick = () => {
    setToggleIcon(!toggleIcon);
  };

  useEffect(() => {
    document.querySelector('html').classList.remove('light', 'dark')
    document.querySelector('html').classList.add(themeMode)
  }, [themeMode])

  return (
    <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
      <div className={`flex gap-10 min-w-screen min-h-screen px-1 sm:px-5 md:px-0`}>
      <div id="left container" className="hidden md:block md:mr-10">
        <Sidebar />
      </div>
      <div id="right-container" className="flex flex-col items-center lg:items-start gap-y-10 pb-5 w-full">
        <div className="w-full flex items-center gap-1 sm:gap-5">
          <div onClick={handleClick} className="md:hidden">
            {toggleIcon ? (
              ""
            ) : (
              <GiHamburgerMenu className="font-semibold text-3xl" />
            )}
          </div>
          <div
            className={`md:hidden overflow-y-auto z-50 top-0 left-0 fixed w-full h-full ${themeMode === "dark" ? "dark:bg-gray-900" : "bg-white"} ${
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
        </div>
        <div>
            <Footer />
          </div>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default Layout;
