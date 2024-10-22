import useTheme from "../../context/useTheme";
import { SidebarRoutes } from "./sidebar-routes"; // Import the routes component

export default function Sidebar() {

    const { themeMode } = useTheme();

    return (
        <div className={`h-full ${themeMode === "dark" ? "dark:text-white dark:bg-gray-900" : ""}`}>
            <div className="h-full md:border-r flex flex-col overflow-y-auto md:shadow-sm">
                <div className="flex justify-center items-center py-8">
                    <span className="text-2xl font-extrabold">InsightLens</span>
                </div>
                <SidebarRoutes />
            </div>
        </div>
    );
}
