import { CiSearch, CiDark, CiLight} from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";

export default function Navbar() {
    return (
        <div className="">
            <div className='flex justify-between items-center border-gray-400 border-2 m-7 px-6 rounded-md'>
                <div className='flex items-center gap-2 p-4 w-1/3 rounded-md'>
                    <CiSearch />
                    <input type="search" placeholder='Search' className=" bg-transparent border-none focus:outline-none"/>
                </div>
                <div className='flex items-center gap-4 text-2xl'>
                    <CiLight/>
                    <CiDark/>
                    <IoIosNotificationsOutline/>
                    <FaRegUserCircle className='text-3xl'/>
                </div>
            </div>
        </div>
    )
}
