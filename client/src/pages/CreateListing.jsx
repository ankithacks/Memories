import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-9'>Create Your Listing</h1>
        <form className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-5 flex-1'>
                <input type="text" placeholder='name' className='border p-3 rounded-lg' id="name" maxLength="70" minLength="10" required/>
                <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id="description" required/>
                <input type="text" placeholder='address' className='border p-3 rounded-lg' id="address"  required/>
                <div className='flex gap-6 flex-wrap'>
                    <div className="flex gap-2">
                        <input type="checkbox"  id="sale" className='w-5' />
                        <span>Sell</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox"  id="rent" className='w-5' />
                        <span>Rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox"  id="parking spot" className='w-5' />
                        <span>Parking Spot</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox"  id="furnished" className='w-5' />
                        <span>Furnished</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox"  id="offer" className='w-5' />
                        <span>Offer</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                        <input className='p-3 border border-gray-400 rounded-lg' type="number" id="bedroom" min='1'  max='10' required/>
                        <p>Beds</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input className='p-3 border border-gray-400 rounded-lg' type="number" id="bathrooms" min='1'  max='10' required/>
                        <p>Bathrooms</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input className='p-3 border border-gray-400 rounded-lg' type="number" id="regularPrice" min='1'  max='10' required/>
                        <div className='flex flex-col items-center'>
                            <p>Regular Price</p>
                            <span className='text-xs'>($/month)</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <input className='p-3 border border-gray-400 rounded-lg' type="number" id="discountPrice" min='1'  max='10' required/>
                        <div className='flex flex-col items-center'>
                            <p>Discount Price</p>
                            <span className='text-xs'>($/month)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col flex-1 gap-4">
                <p className='font-semibold'>Images:-
                <span className='font-normal text-red-600 ml-2'>The first image will be the cover(max upload is 6)</span>
                </p>
                <div className='flex gap-4'>
                    <input type="file" className='p-3 border border-gray-800 rounded w-full' id="images" accept='image/*' multiple />
                    <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg'>Upload</button>
                </div>
            <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:shadow-2xl'>Create Listing</button>
            </div>
        </form>
    </main>
    )
}
