import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact({listing}) {
    const [landlord, setLandlord]=useState(null)
    const [message, setMessage]=useState('')
    useEffect(() => {
        const fetchLandLord=async()=>{
            try {
                const res=await fetch(`/api/user/${listing.userRef}`)
                const data=await res.json()
                setLandlord(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchLandLord()
    }, [listing.userRef])

    const onChange=(e)=>{
        setMessage(e.target.value)
    }
    
  return (
    <>
        {landlord && (
            <div className='flex flex-col gap-2'>
                <p>Contact <span className='font-semibold'>{landlord.username.toUpperCase()}</span> for <span className='font-extrabold'>{listing.name.toUpperCase()}</span></p>
                <textarea name="message" id="message" value={message} onChange={onChange} rows="2" placeholder='Enter your message' className='mt-5 border border-r-orange-500 w-full p-3 rounded-xl'></textarea>
                <Link to={`mailto:${landlord.email}?subject=Regarding${listing.name}&body=${message}`} className='bg-red-500 text-white text-center rounded-lg p-4 uppercase  hover:opacity-95'>
                    SEND MESSAGE
                </Link>
            </div>
        )}
    </>
  )
}
