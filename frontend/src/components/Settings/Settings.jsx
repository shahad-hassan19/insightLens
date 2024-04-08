import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import useTheme from './../../context/useTheme';


export default function Settings() {
    const {themeMode, lightTheme, darkTheme} = useTheme()
    const onChangeBtn = (e) => {
        const darkModeStatus = e.currentTarget.checked
        if(darkModeStatus){
            darkTheme()
        }else{
            lightTheme()
        }
    }

    const navigate = useNavigate()
    const [isHeadingOpen, setIsHeadingOpen] = useState(false)
    const toggleHeadings= () => {
        setIsHeadingOpen(!isHeadingOpen)
    }

    const deleteAccount = () => {
        if (window.confirm("Are you sure you want to delete this account permanently?")) {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("No access token found");
                }

                axios.post("http://localhost:4000/api/users/deactivation", {},{
                    headers: {
                        Authorization: `${token}`
                    }
                });
                localStorage.removeItem("token");
                navigate("/register");
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }

    return (
        <div id="settings" className="flex justify-between">
            <div className="flex flex-col">
                <div>
                    <h3 className="text-3xl font-bold text-left m-6">Settings</h3>
                </div>
                <div className="ml-5 p-5 flex flex-col items-center text-xl font-medium">
                <ul className="">
                <li className="my-8" onClick={toggleHeadings}>Change Password</li>
                <li className="my-8">
                    <div className="flex items-center justify-between">
                        <span>Themes</span>
                        <div className="flex items-center gap-x-2">
                        {themeMode === 'dark' ? (<span className="text-white">Light</span>) : (<span className="text-white">Light</span>)}
                            <div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    value=""
                                    className="sr-only peer"
                                    onChange={onChangeBtn}
                                    checked={themeMode==="dark"}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                            </div>
                            {themeMode === 'light' ? (<span className="text-black">Dark</span>) : (<span className="text-gray-900">Dark</span>)}
                        </div>
                    </div>
                </li>
                <li className="mt-8 mb-4"><Link className="text-current" to="/about-us">About Us</Link></li>

                <div  className="flex justify-between items-center gap-x-10">
                    <li>Deactivate account</li>
                    <button onClick={deleteAccount} className="text-white">Deactivate</button>
                </div>

            </ul>
                </div>
            </div>
        </div>
    )
}

