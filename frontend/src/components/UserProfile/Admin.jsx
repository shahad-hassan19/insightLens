import { useEffect, useState } from 'react';
import defaultPic from '../../assets/profile-pic.png'
import axios from 'axios';

export default function Admin() {
  const [ userData, setUserData ] = useState('')
  const [ profile, setProfile ] = useState('');
  const [ editAble, setEditAble ] = useState(false)

  const handleClick = () => {
    setEditAble(true)
  }

  const handleChange = (e) => {
    const profilePicture = e.target.files[0]
    console.log(profilePicture)
    const SetProfile = async() => {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No access token found');
      }
      await axios.post('https://insight-lens-backend.vercel.app/api/users/upload-profile', {profilePicture}, { headers:
    {
      Authorization: `${token}`,
      'Content-Type': 'multipart/form-data',
    }})
    }
    SetProfile()
    setEditAble(false)
  }

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
            setProfile(response.data.data.profilePicture);
          } else {
            setProfile(defaultPic);
          }

        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    }, [editAble])

    return(
      <div className='flex flex-col items-center'>
          {
            editAble ?
              <div>
                <input type='file' onChange={handleChange} className='outline-none rounded-full border-black'/>
              </div> :
              <div className='m-5 flex flex-col gap-y-3 self-center'>
                <img src={profile} width={160} height={160} />
                  <span onClick={handleClick} className='font-medium cursor-pointer'>Change Profile Picture</span>
              </div>
          }
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
