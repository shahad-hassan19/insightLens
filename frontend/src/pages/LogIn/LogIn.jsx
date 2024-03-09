import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Footer from './../../components/Footer/Footer';
export default function LogIn() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:4000/api/users/login', {email, username, password})
            const token = response.data.data.accessToken;
            localStorage.setItem("token", token)
            navigate("/user");
        } catch (error) {
            setError("Invalid username/email or password.");
        }
    }

    return (
        <div id="register" className="pt-20 px-32">
            <div className=" h-24">
                <h1 className=" text-center font-semibold text-6xl">
                    Welcome to InsightLens!
                </h1>
            </div>
            <div>
                {error && <p className="text-red-500">{error}</p>}
            </div>
            <div className=" p-4 shadow-emerald-50 border-white ">
                <form onSubmit={handleSubmit} className=" flex flex-col gap-4 items-center justify-around">
                    <div className="flex flex-col">
                        <label htmlFor='username_email' className="text-left font-semibold">
                            Username or Email:
                        </label>
                        <input id='username_email' type="text" className="p-1 rounded-md bg-slate-500 text-gray-100" placeholder='Enter your username or email'
                            value={(email || username)}
                            onChange={(e) => {
                                (setEmail(e.target.value) || setUserName(e.target.value))
                            }}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor='password' className="font-semibold text-left">
                            Password:
                        </label>
                        <input id='password' type="password" className="p-1 rounded-md bg-slate-500 text-gray-100" placeholder="Enter your password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                    </div>
                    <button className="w-28 text-white">LogIn</button>
                </form>
            </div>
            <div className='mt-2 mb-24'>
                <p>Not registered yet? <Link to="/register">Register</Link> here!</p>
            </div>
            <Footer/>
        </div>
    )
}

