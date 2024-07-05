import axios from "axios"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import PasswordChecklist from "react-password-checklist"

export default function ChangePassword() {

    const navigate = useNavigate()
    const [ oldPassword, setOldPassword ] = useState('')
    const [ newPassword, setNewPassword ] = useState('')
    const [ confNewPassword, setConfNewPassword ] = useState('')
        const handleClick = async() => {
            try {
                const token = localStorage.getItem('token');
                await axios.post('https://insight-lens-backend.vercel.app/api/users/change-password', {oldPassword, newPassword}, {
                    headers: {
                        Authorization: `${token}`
                    }
                })

                if(newPassword === confNewPassword){
                    navigate("/user/user-profile")
                    alert("Password changed successfully!")
                }
            } catch (error) {
                console.error('Internal Server Error', error);
            }
        }

    return (
        <div id="change-password" className="flex justify-between">
            <div className="flex flex-col">
                <div>
                    <h3 className="text-3xl font-bold text-left m-6">Change Password</h3>
                </div>
                <div className="ml-5 p-5 flex flex-col gap-y-5 text-xl font-medium">
                    <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-4">
                        <span htmlFor="old-password">Old Password:</span>
                        <input id="old-password" type="password" className="p-1 rounded-md bg-slate-500 text-base text-gray-100" autoComplete="current-password" placeholder="Enter old password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-4">
                        <span htmlFor="new-password">New Password:</span>
                        <input id="new-password" type="password" className="p-1 rounded-md bg-slate-500 text-base text-gray-100" placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-4">
                        <span htmlFor="conf-new-password">Confirm New Password:</span>
                        <input id="conf-new-password" type="password" className="p-1 rounded-md bg-slate-500 text-base text-gray-100" placeholder="Confirm new password"
                            value={confNewPassword}
                            onChange={(e) => setConfNewPassword(e.target.value)}
                        />
                    </div>
                    <PasswordChecklist
                        rules={["minLength","specialChar","number","capital","match"]}
                        minLength={8}
                        value={newPassword}
                        valueAgain={confNewPassword}
                        messages={{
                            minLength: "Password must have atleast 8 characters.",
                            specialChar: "Password must contain atleast 1 Special character.",
                            number: "Password must contain atleast 1 Numerical character.",
                            capital: "Password must contain atleast 1 Capital letter",
                            match: "Passwords must match.",
				}}
			/>
                    <button onClick={handleClick} className="self-center md:self-start bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">Change Password</button>
                </div>
            </div>
        </div>
    )
}

