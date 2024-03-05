import React from 'react'
import {useSelector} from 'react-redux'
export default function Profile() {

  const {currentUser}=useSelector((state)=>state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-medium text-center my-10'>Your Profile</h1>

      <form className='flex flex-col'>
        <img src={currentUser.avatar} alt="Profile image" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-5' />
        <input type="text" placeholder='username' className='border p-3 mt-10 rounded-xl' id='username' />
        <input type="email" id='email' placeholder='email' className='border p-3 mt-6 rounded-xl' />
        <input type="password" placeholder='password' id='password' className='border p-3 mt-6 rounded-xl' />
        <button className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white 
        rounded-lg p-4 uppercase disabled:opacity-80 mt-5'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-600 cursor-pointer'>Delete Account</span>
        <span className='text-green-500 cursor-pointer'>SignOut</span>
      </div>
    </div>
  )
}
