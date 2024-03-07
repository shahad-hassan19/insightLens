import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './../../components/Footer/Footer';

export default function Register() {
    const navigate = useNavigate()

    // const [fullName, setFullName] = useState("");
    // const [username, setUserName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [error, setError] = useState("");

    const handleLogout = async () => {
        if (window.confirm("Are you sure you want to logout?")) {
            try {
                // Send request to invalidate session (clear JWT token)
                await axios.get('http://localhost:4000/api/users/logout');
                localStorage.removeItem('token'); // Remove token from local storage
                navigate("/login"); // Redirect to login page
            } catch (error) {
                console.error('Error logging out:', error);
            }
        }
    }

    return (
        <div id="logout">
                <button onClick={handleLogout} className="text-white bg-red-500 px-4 py-2 rounded">Logout</button>
        </div>
    )
}
