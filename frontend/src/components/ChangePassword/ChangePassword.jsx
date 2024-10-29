import axios from "axios"
import { useCallback, useState } from "react"
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'


export default function ChangePassword() {

    const navigate = useNavigate()

        const [formState, setFormState] = useState({
        prevPassword: '',
        newPassword: '',
        confNewPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = useCallback((e) => {
        const { id, value } = e.target;
        setFormState((prevData) => ({ ...prevData, [id]: value }));
    }, []);

        const handleClick = async(e) => {
            e.preventDefault()
            setLoading(true)

            // Check if any field is empty
            const hasEmptyField = Object.values(formState).some(
                field => field === undefined || field.trim() === ""
            );
            if (hasEmptyField) {
                setMessage("All fields are required.");
                setLoading(false)
                return;
            }

            // Check if all fields are filled and password is 8 characters long
            if (!hasEmptyField && formState.prevPassword.length < 8) {
                setMessage("Old Password must be at least 8 characters long.");
                setLoading(false)
                return;
            }

            if (!hasEmptyField && formState.newPassword.length < 8) {
                setMessage("New Password must be at least 8 characters long.");
                setLoading(false)
                return;
            }

            if (!hasEmptyField && formState.confNewPassword.length < 8) {
                setMessage("New password must be at least 8 characters long.");
                setLoading(false)
                return;
            }

            // Check if password matches
            if(formState.newPassword !== formState.confNewPassword){
                setMessage("New passwords do not match!");
                setLoading(false)
                return;
            }
            setMessage('')
            const { prevPassword, newPassword, confNewPassword } = formState;
            try {
                await axios.put("https://insight-lens-backend.vercel.app/api/users/change-password", { prevPassword, newPassword, confNewPassword }, {
                    withCredentials: true
                })
                // toast.success('Password changed successfully!')
                setLoading(false)
                navigate("/user")
            } catch (error) {
                setMessage(error.response?.data?.message)
                setLoading(false)
                console.log("Error while changing password: ", error)
            }
        };

    return (
        <div id="change-password" className="flex justify-between">
            <div className="flex flex-col">
                <div>
                    <h3 className="text-3xl font-bold text-left m-6">Change Password</h3>
                </div>
                {/* <Toaster toastOptions={{duration: 4000}} /> */}
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                    noValidate
                    autoComplete="off"
                    className='flex flex-col items-center justify-center'
                >
                    <TextField id="prevPassword" label="Old Password" variant="outlined"
                        value={formState.prevPassword}
                        onChange={handleChange}
                    />
                    <TextField id="newPassword" label="New Password" variant="outlined"
                        value={formState.newPassword}
                        onChange={handleChange}
                    />
                    <TextField id="confNewPassword" label="Confirm New Password" variant="outlined"
                        value={formState.confNewPassword}
                        onChange={handleChange}
                    />
                    {
                        message &&
                        <p className="text-red-500 mt-4">
                            {message}
                        </p>
                    }
                    <Button variant='contained' disabled={loading} onClick={handleClick}>
                        {
                            loading ? "Saving..." : "Change Password"
                        }
                    </Button>
                </Box>
            </div>
        </div>
    )
}

