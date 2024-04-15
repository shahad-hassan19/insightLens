import { useEffect, useState } from 'react';
import defaultPic from '../../assets/profile-pic.png'
import axios from 'axios';

export default function Admin() {
  const [ userData, setUserData ] = useState('')
  const [ file, setFile ] = useState('');
  const [ profilePic, setProfilePic ] = useState('')
  const [ editAble, setEditAble ] = useState(false)

  const handleClick = () => {
    setEditAble(true)
  }

  const handleSelectFile = (e) => setFile(e.target.files[0]);

  const handleUpload = () => {
    const SetUserProfilePic = async() => {
      const data = new FormData();
      data.append("profile", file);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No access token found');
      }
      await axios.post('http://localhost:4000/api/users/upload-profile', data, { headers:
    {
      Authorization: `${token}`,
    }})
    }
    SetUserProfilePic()
    setEditAble(false)
  }

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('No access token found');
          }
          const response = await axios.get('http://localhost:4000/api/users/currentUser', {
            headers: {
              Authorization: `${token}`
            }
          });
          console.log(response.data.data)
          setUserData(response.data.data);

          if (response.data.data.profile) {
            setProfilePic(response.data.data.profile);
          } else {
            setProfilePic(defaultPic);
          }

        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    }, [userData])

    return(
      <div className='flex flex-col items-center'>
          {
            editAble ?
              <div>
                <input type='file' onChange={handleSelectFile} className='outline-none rounded-full border-black'/>
                <button onClick={handleUpload}>Upload</button>
              </div> :
              <div className='m-5 flex flex-col gap-y-3 self-center'>
                <img src={profilePic} width={160} height={160} className="rounded-full object-fit-cover" />
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
