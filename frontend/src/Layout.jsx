import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
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
      <div className={`flex min-w-screen min-h-screen px-1 sm:px-5 md:px-0`}>
      <div id="left container" className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <div id="right-container" className="md:pl-56 h-full flex flex-col items-center w-full mx-5 lg:mx-10">
        <div className="w-full mt-10 flex items-center justify-between gap-1 sm:gap-5">
          <div onClick={handleClick} className="md:hidden">
            {toggleIcon ? (
              ""
            ) : (
              <GiHamburgerMenu className="font-semibold text-3xl" />
            )}
          </div>
          <div
            className={`md:hidden overflow-y-auto z-50 top-2 left-0 fixed w-full h-full ${themeMode === "dark" ? "dark:bg-gray-900" : "bg-white"} ${
              toggleIcon ? " block " : " hidden"
            }`}
          >
            <div className="flex ml-5 sm:ml-8 mt-8">
              <IoClose className="text-3xl" onClick={handleClick} />
            </div>
            <div className=" flex items-center justify-center w-full" onClick={handleClick}>
              <Sidebar />
            </div>
          </div>
          <span className="block md:hidden text-2xl font-extrabold mr-3">InsightLens</span>
        </div>
        <div className="w-full my-10">
          <Outlet />
        </div>
        <div className="w-full mt-20 md:mt-2">
          <Footer />
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default Layout;
