import React,{useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { app } from '../firebase';
import {Link} from 'react-router-dom'

import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signInFailure,
  signInSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from '../redux/user/userSlice.js';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [userListings, setUserListings]=useState([

  ])
  const dispatch = useDispatch();
  const [showError, setShowError]=useState(false)
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut=async()=>{
    try {
      dispatch(signOutUserStart())
      const res=await fetch('/api/auth/signout')
      const data=await res.json()
      if(data.success === false){
        return dispatch(signOutUserFailure(data.message))
      }
      dispatch(signOutUserSuccess(data))
    } catch (error) {
      dispatch(signOutUserFailure(error.message))    
    }
  }
  const handleShowListings=async()=>{
    try {
      setShowError(false)
      const res=await fetch(`/api/user/listings/${currentUser._id}`)
      const data=await res.json();
      if(data.success === false){
        setShowError(true)
        return
      }

      setUserListings(data)
    } catch (error) {
      setShowError(true)
    }
  }

  const handleListingDelete=async(listingId)=>{
    try {
      const res=await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE'
      })
      const data=await res.json()

      if(data.success === false){
        console.log(data.message)
        return
      }

      setUserListings((prev)=>prev.filter((listing)=>listing._id !== listingId))
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-medium text-center my-10'>Your Profile</h1>

      <form className='flex flex-col' onSubmit={handleSubmit}>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
        <img src={formData.avatar || currentUser.avatar} onClick={()=>fileRef.current.click()} alt="Profile image" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-5' />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-purple-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input type="text" placeholder='username' className='border p-3 mt-10 rounded-xl' id='username' defaultValue={currentUser.username} onChange={handleChange}/>
        <input type="email" id='email' placeholder='email' className='border p-3 mt-6 rounded-xl' defaultValue={currentUser.email} onChange={handleChange}/>
        <input type="password" placeholder='password' id='password' className='border p-3 mt-6 rounded-xl' onChange={handleChange}/>
        <button disabled={loading} className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white 
        rounded-lg p-4 uppercase disabled:opacity-80 mt-5'>
          {loading ? "Loading...." : "Update"}
          
        </button>
        <Link className='bg-green-700 mt-5 rounded-lg p-4 uppercase text-white text-center' to={"/create-listing"}>
          Create Listing
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
      <span
          onClick={handleDeleteUser}
          className='text-red-700 cursor-pointer'
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className='text-green-500 cursor-pointer'>SignOut</span>
      </div>
      <p className='text-red-600 mt-6'>{error ? error : '' }</p>
      <p className='text-green-500 mt-5'>{updateSuccess ? "successfully updated" : ""}</p>
      <button onClick={handleShowListings} className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white 
        rounded-lg p-4 uppercase  mt-5 w-full hover:bg-green-400'>Manage and Show Your Listings</button>
        <p>{showError ? 'Error showing listings' : ''}</p>
        
        {userListings && userListings.length > 0 && 
        userListings.map((listing)=>(
          <div className='border rounded-lg p-3 flex justify-between items-center gap-4' key={listing._id}>
            <Link to={`/listing/${listing._id}`}>
              <img src={listing.imageUrls[0]} alt="listing images" className='h-16 w-16 object-contain' />
              <Link className='flex-1 text-slate-600 font-semibold hover:underline truncate' to={`/listing/${listing._id}`}>
                <p >{listing.name}</p>
              </Link>
            </Link>
            <div className='flex flex-col items-center'>
              <button onClick={()=>handleListingDelete(listing._id)} className='text-red-600 '>DELETE</button>
              <Link  to={`/update-listing/${listing._id}`}>
                <button className='text-green-600 '>EDIT</button>
              </Link>
            </div>
          </div>
        ))
        }
    </div>
  )
}
