import { CiSearch, CiLight} from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import pic from '../../assets/profile-pic.png'

export default function Navbar() {
    return (
        <div className="w-full">
            <div className='w-full flex sm:justify-between border-gray-400 border-2 rounded-md p-1 md:px-4 my-5'>
                <div className='flex items-center gap-2 md:p-4 rounded-md'>
                    <CiSearch />
                    <input type="search" placeholder='Search' className=" bg-transparent border-none focus:outline-none"/>
                </div>
                <div className='flex items-center md:gap-4 text-4xl'>
                    <CiLight/>
                    <IoIosNotificationsOutline/>
                    <img src={pic} width={40} height={40} />
                </div>
            </div>
        </div>
    )
}
