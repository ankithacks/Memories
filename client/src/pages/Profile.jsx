import React,{useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { app } from '../firebase';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(file)

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
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-medium text-center my-10'>Your Profile</h1>

      <form className='flex flex-col'>
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
