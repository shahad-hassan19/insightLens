import axios from "axios";
import { useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { IoHomeOutline, IoBarChartOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { RxDashboard } from "react-icons/rx";
import { FiPlusSquare } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";


export const SidebarRoutes = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = useCallback(async () => {
        if (window.confirm("Are you sure you want to logout?")) {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("No access token found");
                }

                await axios.post("https://insight-lens-backend.vercel.app/api/users/logout", {}, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });

                localStorage.removeItem("token");
                navigate("/login");

                } catch (error) {
                console.error("Error logging out:", error);
            }
        }
    }, [navigate]);

    const routes = [
        { icon: IoHomeOutline, label: "Home", href: "/user" },
        { icon: CgProfile, label: "Profile", href: "/user/user-profile" },
        { icon: RxDashboard, label: "Dashboard", href: "/user/user-dashboard" },
        { icon: FiPlusSquare, label: "Add Reports", href: "/user/new-report" },
        { icon: IoBarChartOutline, label: "Data Charts", href: "/user/data-charts" },
        { icon: CiSettings, label: "Settings", href: "/user/settings" },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <ul className="flex flex-col text-left">
            {routes.map((route) => (
                <li
                    key={route.href}
                    className={`py-2 px-3 flex items-center gap-x-2 text-sm font-[500] pl-6 transition-all  ${isActive(route.href) ? "text-sky-700 md:bg-sky-200/20" : "text-slate-500 hover:text-slate-600 hover:bg-slate-300/20"}`}
                >
                    <Link
                        to={route.href}
                        className={`text-black font-medium text-xl inline-flex items-center gap-1 ${isActive(route.href) ? "text-sky-700" : ""}`}
                    >
                        <route.icon size={22} />
                        {route.label}
                    </Link>
                </li>
            ))}
            <li className="py-2 px-3">
                <button
                    onClick={handleLogout}
                    className={`text-white font-medium text-xl inline-flex items-center gap-1`}
                >
                    <IoIosLogOut size={22} />
                    LogOut
                </button>
            </li>
        </ul>
    );
};
