import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { IoBarChartOutline, IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FiPlusSquare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useTheme from "../../context/useTheme";
import { useCallback } from "react";

export default function Sidebar() {
    const navigate = useNavigate();
    const { themeMode } = useTheme()

    const handleLogout = useCallback( async () => {
        if (window.confirm("Are you sure you want to logout?")) {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("No access token found");
                }

                await axios.post("http://localhost:4000/api/users/logout", {},{
                    headers: {
                        Authorization: `${token}`
                    }
                });
                localStorage.removeItem("token");
                navigate("/login");
            } catch (error) {
                console.error("Error logging out:", error);
            }
        }
    }, [navigate])


    return (
    <div className= {`h-full ${themeMode === "dark" ? "dark:text-white dark:bg-gray-900" : ""}`}>
        <div className="h-full px-1 md:shadow-2xl">
            <nav>
                <div className="flex justify-center items-center py-8">
                    <span className="text-2xl font-extrabold">
                        InsightLens
                    </span>
                </div>
                <div>
                    <ul className="flex flex-col text-left">
                        <li className="py-2 px-3">
                            <Link
                            to="/user"
                            className= {`text-black font-medium text-xl inline-flex items-center gap-1 ${themeMode === "dark" ? "dark:text-white" : ""}`}
                            >
                                <IoHomeOutline />Home
                            </Link>
                        </li>
                        <li className="py-2 px-3">
                            <Link
                            to="/user/user-profile"
                            className= {`text-black font-medium text-xl inline-flex items-center gap-1 ${themeMode === "dark" ? "dark:text-white" : ""}`}
                            >
                                <CgProfile />Profile
                            </Link>
                        </li>
                        <li className="py-2 px-3">
                            <Link
                            to="/user/user-dashboard"
                            className= {`text-black font-medium text-xl inline-flex items-center gap-1 ${themeMode === "dark" ? "dark:text-white" : ""}`}
                            >
                                <RxDashboard />Dashboard
                            </Link>
                        </li>
                        <li className="py-2 px-3">
                            <Link
                            to="/user/new-report"
                            className= {`text-black font-medium text-xl min-w-max inline-flex items-center gap-1 ${themeMode === "dark" ? "dark:text-white" : ""}`}
                            >
                                <FiPlusSquare />Add Reports
                            </Link>
                        </li>
                        <li className="py-2 px-3">
                            <Link
                            to="/user/data-charts"
                            className= {`text-black font-medium text-xl min-w-max inline-flex items-center cursor-pointer gap-1 ${themeMode === "dark" ? "dark:text-white" : ""}`}
                            >
                                <IoBarChartOutline />Data Charts
                            </Link>
                        </li>
                        <li className="pt-2 md:pt-1 pb-2 px-3">
                            <Link
                            to="/user/settings"
                            className= {`text-black font-medium text-xl inline-flex items-center gap-1 ${themeMode === "dark" ? "dark:text-white" : ""}`}
                            >
                                <CiSettings />Settings
                            </Link>
                        </li>
                        <li className="py-2 px-3">
                            <Link
                            onClick={handleLogout}
                            className= {`text-black font-medium text-xl inline-flex items-center gap-1 ${themeMode === "dark" ? "dark:text-white" : ""}`}
                            >
                                <IoIosLogOut />LogOut
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
    );
}
