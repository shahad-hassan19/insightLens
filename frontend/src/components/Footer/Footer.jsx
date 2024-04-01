import {  FaFacebookSquare, FaInstagram, FaGithubSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useTheme from "../../context/useTheme";

export default function Footer() {
    const {themeMode} = useTheme()
    return (
        <div className={`w-full flex flex-col justify-center`}>
            <div className="mb-5 px-5" >
                <ul className="flex items-center justify-center text-3xl gap-5">
                    <li><a className= {`text-black ${themeMode === "dark" ? "dark:text-white" : ""}`} target="_blank" href="https://www.facebook.com/"><FaFacebookSquare/></a></li>
                    <li><a className= {`text-black ${themeMode === "dark" ? "dark:text-white" : ""}`} target="_blank" href="https://www.instagram.com/"><FaInstagram/></a></li>
                    <li><a className= {`text-black ${themeMode === "dark" ? "dark:text-white" : ""}`} target="_blank" href="https://twitter.com/"><FaXTwitter/></a></li>
                    <li><a className= {`text-black ${themeMode === "dark" ? "dark:text-white" : ""}`} target="_blank" href="https://github.com/"><FaGithubSquare/></a></li>
                </ul>
            </div>
            <div className="flex flex-col md:flex-row text-center justify-center px-5 xs:gap-0 md:gap-5">
                <span>
                    2024 <Link to="/" className="text-orange-400 font-bold">InsightLens.Inc.</Link>
                </span>
                <span>All Rights Reserved.</span>
                <ul className="flex justify-center list-disc gap-8 ml-4">
                    <li>Privacy Policy</li>
                    <li>Terms & Conditions</li>
                </ul>
            </div>
        </div>
    )
}

