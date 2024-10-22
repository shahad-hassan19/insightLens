import axios from 'axios';
import { useState, useCallback } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Footer from './../../components/Footer/Footer';

export default function Register() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        try {
            await axios.post('https://insight-lens-backend.vercel.app/api/users/register', formData);
            navigate("/login")
        } catch (error) {
            setError("Username or Email already exists.")
        }
    }

    const handleChange = useCallback((e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    }, []);

    const { fullName, username, email, password } = formData;

    return (
        <div id="register" className="px-5 mt-10 md:pt-10 md:px-32">
            <div className="md:h-24">
                <h1 className="font-semibold text-center text-3xl md:text-6xl">
                    Welcome to InsightLens!
                </h1>
            </div>
            <div>
                {error &&
                <p className="text-center text-red-500">
                    {error}
                </p>}
            </div>
            <div className="m-4 md:mt-16 lg:mt-0 shadow-emerald-50 border-white ">
                {/* <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center justify-around">
                    <div className="flex flex-col">
                        <label htmlFor="fullName" className="font-semibold text-left">
                            Full Name:
                        </label>
                        <input
                            id="fullName"
                            type="text"
                            className="p-1 rounded-md bg-slate-500 text-gray-100"
                            placeholder="Enter your name"
                            value={fullName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="username" className="font-semibold text-left">
                            Username:
                        </label>
                        <input
                            id="username"
                            type="text"
                            minLength={5}
                            className="p-1 rounded-md bg-slate-500 text-gray-100"
                            placeholder="Enter username"
                            value={username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-semibold text-left">
                            Email:
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="p-1 rounded-md bg-slate-500 text-gray-100"
                            placeholder="Enter your e-mail"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="font-semibold text-left">
                            Password:
                        </label>
                        <input
                            id="password"
                            type="password"
                            minLength={8}
                            maxLength={16}
                            className="p-1 rounded-md bg-slate-500 text-gray-100"
                            placeholder="Enter password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    <button className="w-28 text-white">Register</button>
                </form> */}
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                    noValidate
                    autoComplete="off"
                    className='flex flex-col items-center justify-center'
                >
                    <TextField id="fullName" label="FullName" variant="outlined"
                        value={fullName}
                        onChange={handleChange}
                    />
                    <TextField id="username" label="Username" variant="outlined"
                        value={username}
                        onChange={handleChange}
                    />
                    <TextField id="email" label="Email" variant="outlined"
                        value={email}
                        onChange={handleChange}
                    />
                    <TextField id="password" label="Password" variant="outlined"
                        value={password}
                        onChange={handleChange}
                    />
                    <Button variant='contained' onClick={handleSubmit}>Register</Button>
                </Box>
            </div>
            <div className="mt-2 mb-10 md:mb-20 text-center">
                <p>
                    Already registered? <Link to="/login">LogIn</Link> here!
                </p>
            </div>
            <Footer/>
        </div>
    )
}
