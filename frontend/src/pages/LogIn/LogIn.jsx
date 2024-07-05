import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import axios from 'axios';
import Footer from './../../components/Footer/Footer';
export default function LogIn() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        usernameOrEmail: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = useCallback((e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault()
        const { usernameOrEmail, password } = formData;
        const isEmail = usernameOrEmail.includes('@');
        try {
            const response = await axios.post('http://localhost:4000/api/users/login', {
                [isEmail ? 'email' : 'username']: usernameOrEmail,
                password
            })
            const token = response.data.data.accessToken;
            localStorage.setItem("token", token)
            navigate("/user");
        } catch (error) {
            setError(`Invalid ${isEmail ? 'email' : 'username'} or password.`);
        }
    }

    const { usernameOrEmail, password } = formData;

    return (
        <div id="login" className="flex flex-col justify-between px-5 mt-10 md:pt-20 md:px-32">
            <div className=" md:h-24">
                <h1 className="text-center font-semibold text-3xl md:text-6xl">
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center justify-around">
                    <div className="flex flex-col">
                        <label htmlFor='usernameOrEmail' className="text-left font-semibold">
                            Username or Email:
                        </label>
                        <input
                            id='usernameOrEmail'
                            type="text"
                            className="p-1 rounded-md bg-slate-500 text-gray-100"
                            placeholder='Enter your username or email'
                            value={usernameOrEmail}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor='password' className="font-semibold text-left">
                            Password:
                        </label>
                        <input
                            id='password'
                            type="password"
                            minLength={8}
                            className="p-1 rounded-md bg-slate-500 text-gray-100"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    <button className="w-28 text-white">LogIn</button>
                </form>
            </div>
            <div className='mt-2 mb-10 md:mb-16 text-center'>
                <p>Not registered yet? <Link to="/register">Register</Link> here!</p>
                <br></br>
                <p>For convenience, you can use Username: <b>admin</b> and password: <b>password</b>.</p>
            </div>
            <Footer/>
        </div>
    )
}

