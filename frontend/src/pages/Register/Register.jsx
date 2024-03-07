import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './../../components/Footer/Footer';

export default function Register() {
    const navigate = useNavigate()

    const [ fullName, setFullName] = useState()
    const [ username, setUserName] = useState()
    const [ email, setEmail] = useState()
    const [ password, setPassword] = useState()
    const [ error, setError ] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/users/register', {fullName, username, email, password});
            if(!response.data.existedUser)
            navigate("/user")
        } catch (error) {
            setError("Username or Email already exists.")
        }
    }

    return (
        <div id="register" className="px-32 pt-20">
            <div className=" h-24">
                <h1 className="font-semibold text-center text-6xl">
                    Welcome to InsightLens!
                </h1>
            </div>
            <div>
                {error && <p className="text-red-500">{error}</p>}
            </div>
            <div className=" p-4 shadow-emerald-50 border-white ">
                <form onSubmit={handleSubmit} className=" flex flex-col gap-4 items-center justify-around">
                    <div className="flex flex-col">
                        <label htmlFor="full_name" className="font-semibold text-left">
                            Full Name:
                        </label>
                        <input id="full_name" type="text" className="p-1 rounded-md bg-slate-500 text-gray-100" placeholder="Enter your name"
                        value={fullName}
                            onChange={(e) => {
                                setFullName(e.target.value)
                            }}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="username" className="font-semibold text-left">
                            Username:
                        </label>
                        <input id="username" type="text" className="p-1 rounded-md bg-slate-500 text-gray-100" placeholder="Enter username"
                            value={username}
                            onChange={(e) => {
                                setUserName(e.target.value)
                            }}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-semibold text-left">
                            Email:
                        </label>
                        <input id="email" type="email" className="p-1 rounded-md bg-slate-500 text-gray-100" placeholder="Enter your e-mail"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="font-semibold text-left">
                            Password:
                        </label>
                        <input id="password" type="password" className="p-1 rounded-md bg-slate-500 text-gray-100" autoComplete="current-password" placeholder="Enter password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                    </div>
                    <button className="w-28 text-white" >Register</button>
                </form>
            </div>
            <div className="mt-2 mb-10">
                <p>Already registered? <Link to="/login">LogIn</Link> here!</p>
            </div>
            <Footer/>
        </div>
    )
}