import { useState } from "react"


export default function Settings() {
    const [isHeadingOpen, setIsHeadingOpen] = useState(false)
    const toggleHeadings= () => {
        setIsHeadingOpen(!isHeadingOpen)
    }

    return (
        <div id="settings" className="flex justify-between">
            <div className="flex flex-col">
                <div>
                    <h3 className="text-3xl font-bold text-left m-6">Settings</h3>
                </div>
                <div className="ml-5 p-5 flex flex-col items-center text-xl font-medium">
                <ul className="">
                <li className="my-8">Change Password</li>
                <li className="my-8" onClick={toggleHeadings}>Themes</li>
                {/* {isHeadingOpen && <div>
                    <select className="div m-2 border-2">
                        <option>Dark Mode</option>
                        <option>Light Mode</option>
                    </select>
                </div>} */}
                <li className="mt-8 mb-4" onClick={toggleHeadings}>About Us</li>
                {/* {isHeadingOpen && <div>InsightLens</div>} */}

                <div  className="flex justify-between items-center gap-x-10">
                    <li>Delete your account</li>
                    <button className="text-white">Delete Account</button>
                </div>

            </ul>
                </div>
            </div>
        </div>
    )
}

