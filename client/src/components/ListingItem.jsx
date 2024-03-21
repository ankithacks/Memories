import React from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
export default function ListingItem({listing}) {
  return (
    // <div>{listing.name}</div>
    <div className='bg-white shadow-lg rounded-lg hover:shadow-2xl overflow-hidden w-full sm:w-[330px]'>
        <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0]} alt=''  className='h-[320px] sm:h-[220px] w-full object-cover rounded hover:scale-105 transition-scale duration-500'/>
            <div className='p-3 flex flex-col gap-2'>
                <p className='text-lg font-semibold text-slate-700 truncate'>{listing.name}</p>
                <div className='flex items-center gap-2'>
                    <MdLocationOn className='h-4 w-4 text-green-700'/>
                    <p className='text-gray-600 text-sm'>{listing.address}</p>
                </div>
                <p className='truncate'>{listing.description}</p>
                <p className='text-slate-500 mt-2 font-semibold'> 
                    $ 
                    {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                    {listing.type === 'rent' && ' / months'}
                </p>
                <div className='text-slate-600 flex gap-3'>
                    <div className='font-bold text-xs'>
                        {listing.bedRooms > 1 ? `${listing.bedRooms} beds` : `${listing.bedRooms} bed`}
                    </div>
                    <div className='font-bold text-xs'>
                        {listing.bathRooms > 1 ? `${listing.bathRooms} bathrooms` : `${listing.bathRooms} bathrooms`}
                    </div>
                </div>
            </div>
        </Link>
    </div>
  )
}
