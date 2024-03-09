import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { TiArrowSortedDown } from "react-icons/ti";
import { RxDashboard } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { IoBarChartOutline, IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Sidebar() {
    const navigate = useNavigate();
    const [isDataChartsOpen, setIsDataChartsOpen] = useState(false);
    const handleLogout = async () => {
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
    };

    const toggleDataCharts = () => {
        setIsDataChartsOpen(!isDataChartsOpen);
    };


    return (
    <div>
        <div
        id="left-container"
        className="fixed h-full border-gray-400 shadow-2xl"
        >
            <nav>
                <div className=" h-20 flex justify-center items-center py-4 px-3 mx-3">
                    <span className="text-2xl font-extrabold text-black">
                        InsightLens
                    </span>
                </div>
                <div>
                    <ul className="flex flex-col text-left">
                        <li className="py-4 px-3 mx-3">
                            <Link
                            to="/user"
                            className=" text-black font-medium text-xl inline-flex items-center gap-1"
                            >
                                <IoHomeOutline />Home
                            </Link>
                        </li>
                        <li className="py-4 px-3 mx-3">
                            <Link
                            to="/user/user-profile"
                            className=" text-black font-medium text-xl inline-flex items-center gap-1"
                            >
                                <CgProfile />Profile
                            </Link>
                        </li>
                        <li className="py-4 px-3 mx-3">
                            <Link
                            to="/user/user-dashboard"
                            className=" text-black font-medium text-xl inline-flex items-center gap-1"
                            >
                                <RxDashboard />Dashboard
                            </Link>
                        </li>
                        <li className="py-4 px-3 mx-3">
                            <span
                            onClick={toggleDataCharts}
                            className=" text-black font-medium text-xl inline-flex items-center gap-1">
                                <IoBarChartOutline />Data Charts
                                <span>
                                    {isDataChartsOpen ? <TiArrowSortedDown className="-rotate-90" />: <TiArrowSortedDown/>}
                                </span>
                            </span>
                            {/* Render the links inside the accordion if it's open */}
                            {isDataChartsOpen && (
                                    <ul className="pl-6">
                                        <li className="py-2">
                                            <Link
                                                to="/user/sector"
                                                className="font-medium text-lg"
                                            >
                                                Sector
                                            </Link>
                                        </li>
                                        <li className="py-2">
                                            <Link
                                                to="/user/intensity"
                                                className="font-medium text-lg"
                                            >
                                                Intensity
                                            </Link>
                                        </li>
                                        <li className="py-2">
                                            <Link
                                                to="/user/pestle"
                                                className="font-medium text-lg"
                                            >
                                                Pestle
                                            </Link>
                                        </li>
                                        <li className="py-2">
                                            <Link
                                                to="/user/year"
                                                className="font-medium text-lg"
                                            >
                                                Year
                                            </Link>
                                        </li>
                                        <li className="pt-2">
                                            <Link
                                                to="/user/country"
                                                className="font-medium text-lg"
                                            >
                                                Country
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                        </li>
                        <li className="pt-2 pb-4 px-3 mx-3">
                            <Link
                            to="/user/settings"
                            className=" text-black font-medium text-xl inline-flex items-center gap-1"
                            >
                                <CiSettings />Settings
                            </Link>
                        </li>
                        <li className="py-4 px-3 mx-3">
                            <Link
                            onClick={handleLogout}
                            className=" text-black font-medium text-xl inline-flex items-center gap-1"
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
