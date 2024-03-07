import {  FaFacebookSquare, FaInstagram, FaGithubSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className='relative bottom-0 left-0 w-full flex flex-col justify-center p-4'>
            <div className="mb-5" >
                <ul className="flex items-center justify-center text-3xl gap-5">
                    <li><a className="text-black" target="_blank" href="https://www.facebook.com/"><FaFacebookSquare/></a></li>
                    <li><a className="text-black" target="_blank" href="https://www.instagram.com/"><FaInstagram/></a></li>
                    <li><a className="text-black" target="_blank" href="https://twitter.com/"><FaXTwitter/></a></li>
                    <li><a className="text-black" target="_blank" href="https://github.com/"><FaGithubSquare/></a></li>
                </ul>
            </div>
            <div className="flex justify-center gap-5">
                <span>
                    2024 <Link to="/" className="text-black font-bold">InsightLens.Inc.</Link> All Rights Reserved.
                </span>
                <ul className="flex list-disc gap-8 ml-4">
                    <li>Privacy Policy</li>
                    <li>Terms & Conditions</li>
                </ul>
            </div>
        </div>
    )
}

