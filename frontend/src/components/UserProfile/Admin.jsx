import { useEffect, useState } from 'react';
import pic from '../../assets/profile-pic.png'
import axios from 'axios';

export default function Admin() {
  const [userData, setUserData] = useState('')
    // useEffect(() => {
    //   axios.get('http://localhost:4000/api/users/currentUser')
    // .then(res => {
    //   setUserData(res.data)
    //   console.log(userData)
    // })
    // .catch((error) => {
    //   console.log("Error while fetching username", error)
    // })
    // }, [])

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const token = localStorage.getItem('token'); // Assuming token is stored in localStorage after successful login
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
        } catch (error) {
          console.error('Error fetching user data:', error);

        }
      };
      fetchUserData();
    }, [])

    return(
      <div className='flex flex-col items-center'>
          <div className='m-5 flex self-center'>
              <img src={pic} width={160} height={160} />
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
