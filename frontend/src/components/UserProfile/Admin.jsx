import { useEffect, useState } from 'react';
import defaultPic from '../../assets/profile-pic.png'
import axios from 'axios';

export default function Admin() {
  const [userData, setUserData] = useState('')
  const [profilePic, setProfilePic] = useState('');

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('No access token found');
          }

          const response = await axios.get('https://insight-lens-backend.vercel.app/api/users/currentUser', {
            headers: {
              Authorization: `${token}`
            }
          });
          setUserData(response.data.data);

          if (response.data.data.profilePicture) {
            setProfilePic(response.data.data.profilePicture);
          } else {
            setProfilePic(defaultPic);
          }

        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    }, [])

    return(
      <div className='flex flex-col items-center'>
          <div className='m-5 flex self-center'>
              <img src={profilePic} width={160} height={160} />
          </div>
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
