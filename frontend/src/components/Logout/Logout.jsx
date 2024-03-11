
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Register() {
    const navigate = useNavigate()


    const handleLogout = async () => {
        if (window.confirm("Are you sure you want to logout?")) {
            try {
                const token = localStorage.getItem('token'); // Assuming token is stored in localStorage after successful login
            if (!token) {
                throw new Error('No access token found');
            }

                // Send request to invalidate session (clear JWT token)
                await axios.post('https://insight-lens-beta.vercel.app/api/users/logout', {
                    headers: {
                        Authorization: `${token}`
                    }
                });
                localStorage.removeItem('token'); // Remove token from local storage
                navigate("/login"); // Redirect to login page
            } catch (error) {
                console.error('Error logging out:', error);
            }
        }
    }

    return (
        <div id="logout">
                <span onClick={handleLogout}>Logout</span>
        </div>
    )
}
