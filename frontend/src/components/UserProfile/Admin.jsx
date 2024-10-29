import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import defaultPic from '../../assets/profile-pic.png'

export default function Admin() {
    const [ userData, setUserData ] = useState({})
    const [ file, setFile ] = useState(null);
    const [ editAble, setEditAble ] = useState(false)

    const handleClick = () => {
        setEditAble(true)
    }

    const handleSelectFile = (e) => setFile(e.target.files[0]);

    const handleUpload = async() => {
        if (!file) return;

        const data = new FormData();
        data.append("profile", file);
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No access token found');
            return;
        }
        try {
            await axios.post('https://insight-lens-backend.vercel.app/api/users/upload-profile', data, {
                headers: {Authorization: `${token}`}
            })
            setEditAble(false)
            fetchUserData();
        } catch (error) {
            console.error('Error uploading profile picture:', error)
        }
    }
    const fetchUserData = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No access token found');
            return;
        }

        try {
            const response = await axios.get('https://insight-lens-backend.vercel.app/api/users/currentUser', {
                headers: {Authorization: `${token}`}
            });
            const user = response.data.data;
            setUserData(user);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }, []);


    useEffect(() => {
        fetchUserData();
    }, [fetchUserData])

    return(
        <div className='flex flex-col items-center'>
            {editAble ? (
                <div className='m-5 flex flex-col items-center gap-y-3'>
                    {
                        userData?.profile && (<img src={userData?.profile || defaultPic} width={120} height={120} className="object-center rounded-md" />)
                    }
                    <div className='inline-flex items-center justify-center'>
                        <input type='file'
                            onChange={handleSelectFile}
                            className='outline-none border-black'
                        />
                        <button className='text-white' onClick={handleUpload}>
                            Upload
                        </button>
                    </div>
                    <button className='text-white' onClick={() => setEditAble(false)}>
                        Cancel
                    </button>
                </div>
            ): (
                <div className='m-5 flex flex-col gap-y-3 self-center'>
                    <img src={userData?.profile || defaultPic} width={120} height={120} className="object-center rounded-md" />
                    <span onClick={handleClick} className='font-medium cursor-pointer'>
                        Change Profile Picture
                    </span>
                </div>
            )}
            <div className='mx-5 my-2 text-2xl shadow-lg flex'>
                <h6 className='font-medium mr-4'>Name: </h6>
                <em className='font-semibold text-sky-600'>{userData.fullName}</em>
            </div>
            <div className='mx-5 my-2 text-2xl shadow-lg flex'>
                <h6 className='font-medium mr-4'>Username: </h6>
                <em className='font-semibold text-sky-600'>{userData.username}</em>
            </div>
            <div className='mx-5 mt-2 mb-20 text-2xl shadow-lg flex'>
                <h6 className='font-medium mr-4'>Email: </h6>
                <em className='font-semibold text-sky-600'>{userData.email}</em>
            </div>
        </div>
    )
}
