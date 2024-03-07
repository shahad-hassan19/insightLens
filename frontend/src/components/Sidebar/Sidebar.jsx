import { Link } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import { TiArrowSortedDown } from "react-icons/ti";
import { RxDashboard } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { IoBarChartOutline, IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


export default function Sidebar() {
  const navigate = useNavigate()
  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
        try {
            await axios.post('http://localhost:4000/api/users/logout', null, {withCredentials: true})
            localStorage.removeItem('token');
            navigate("/login");
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }
}

  return (
    <div>
        <div id='left-container' className='fixed h-full border-gray-400 shadow-2xl'>
          <nav>
              <div className=' h-20 flex justify-center items-center py-4 px-3 mx-3'>
                  <span className='text-2xl font-extrabold text-black'>InsightLens</span>
              </div>
              <div>
                  <ul className='flex flex-col text-left' >
                    <li className='py-4 px-3 mx-3'><Link to="/user" className=' text-black font-medium text-xl inline-flex items-center gap-1'><IoHomeOutline/>Home</Link></li>
                    <li className='py-4 px-3 mx-3'><Link to="/user/user-profile" className=' text-black font-medium text-xl inline-flex items-center gap-1'><CgProfile/>Profile</Link></li>
                    <li className='py-4 px-3 mx-3'><Link to="/user/user-dashboard" className=' text-black font-medium text-xl inline-flex items-center gap-1'><RxDashboard/>Dashboard</Link></li>
                    <li className='py-4 px-3 mx-3'><span className=' text-black font-medium text-xl inline-flex items-center gap-1'><IoBarChartOutline/>Data Charts<span><TiArrowSortedDown/></span></span></li>
                    <li className='py-4 px-3 mx-3'><Link to="/user/settings" className=' text-black font-medium text-xl inline-flex items-center gap-1'><CiSettings/>Settings</Link></li>
                    <li className='py-4 px-3 mx-3'><Link to="/user/logout" onClick={handleLogout} className=' text-black font-medium text-xl inline-flex items-center gap-1'><IoIosLogOut/>LogOut</Link></li>
                  </ul>
              </div>
          </nav>
          </div>
    </div>
  )
}