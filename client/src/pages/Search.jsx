import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
export default function Search() {
    const [sideBarData, setSideBarData]=useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc'
    })
    const [loading, setLoading]=useState(false)
    const [listings, setListings]=useState([])
    const navigate=useNavigate()
    console.log(sideBarData)
    console.log(listings)
    const handleChange=(e)=>{
        if(e.target.id === 'all'  || e.target.id === 'rent' || e.target.id==='sale'){
            setSideBarData({...sideBarData, type: e.target.id})
        }
        if(e.target.id === 'searchTerm'){
            setSideBarData({...sideBarData, searchTerm: e.target.value})
        }

        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setSideBarData({...sideBarData, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false})
        }
        if(e.target.id==='sort_order'){
            const sort=e.target.value.split('_')[0] || 'created_at'
            const order=e.target.value.split('_')[1] || 'desc'

            setSideBarData({...sideBarData, sort, order})
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        const urlParams=new URLSearchParams()
        urlParams.set('searchTerm', sideBarData.searchTerm)
        urlParams.set('type', sideBarData.type)
        urlParams.set('parking', sideBarData.parking)
        urlParams.set('furnished', sideBarData.furnished)
        urlParams.set('offer', sideBarData.offer)
        urlParams.set('sort', sideBarData.sort)
        urlParams.set('order', sideBarData.order)
        const searchQuery=urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }

    useEffect(() => {
        const urlParams=new URLSearchParams(location.search)
        const searchTermFromUrl=urlParams.get('searchTerm')
        const typeFromUrl=urlParams.get('type')
        const parkingFromUrl=urlParams.get('parking')
        const furnishedFromUrl=urlParams.get('furnished')
        const offerFromUrl=urlParams.get('offer')
        const sortFromUrl=urlParams.get('sort')
        const orderFromUrl=urlParams.get('order')
        if(searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sortFromUrl || orderFromUrl){
            setSideBarData({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer : offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc'
            })
        }

        const fetchListing=async()=>{
            setLoading(true)
            const searchQuery=urlParams.toString()
            const res=await fetch(`/api/listing/get?${searchQuery}`)
            const data=await res.json()
            setListings(data)
            setLoading(false)
        }
        fetchListing()
    }, [location.search])
    
  return (
    <div className='flex flex-col md:flex-row md:min-h-screen'>
        <div className="p-9 border-b-5 md:border-r-4">
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <div className="flex items-center gap-2">
                    <label  className='whitespace-nowrap font-semibold'>Search Term</label>
                    <input type="text" id='searchTerm' placeholder='Search....'  
                    value={sideBarData.searchTerm}
                    onChange={handleChange}
                    className='border rounded-lg p-3 w-full text-center'/>
                </div>
                <div className='flex gap-3 flex-wrap'>
                    <label className='font-semibold'>Type:</label>
                    <div className='flex gap-2'>
                        <input type="checkbox" id="all" onChange={handleChange} checked={sideBarData.type === 'all'} //this means the rent and sale checkbox is checked by default
                         className='w-5'/>
                        <span>Rent & Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" onChange={handleChange} checked={sideBarData.type === 'rent'} id="rent" className='w-5'/>
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input onChange={handleChange} checked={sideBarData.type === 'sale'} type="checkbox" id="sale" className='w-5'/>
                        <span>Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id="offer" className='w-5' onChange={handleChange} checked={sideBarData.offer}/>
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex gap-3 flex-wrap'>
                    <label className='font-semibold'>Ammenites:</label>
                    <div className='flex gap-2'>
                        <input type="checkbox" onChange={handleChange} checked={sideBarData.parking} id="parking" className='w-5'/>
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id="furnished" onChange={handleChange} checked={sideBarData.furnished} className='w-5'/>
                        <span>Furnished</span>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <label className='font-semibold'>SORT:- </label>
                    <select  id="sort_order" onChange={handleChange} defaultValue={'created_at_dec'} className='border rounded-lg p-4'>
                        <option value="regularPrice_desc">Price High To Low</option>
                        <option value="regularPrice_asc">Price Low To High</option>
                        <option value="createdAt_desc">Latest</option>
                        <option value="createdAt_asc">Oldest</option>
                    </select>
                </div>

                <button className='bg-violet-500 text-center p-5 rounded-xl text-white font-medium'>SEARCH</button>
            </form>
        </div>
        <div className="">
            <h1 className='text-3xl font-semibold border-b p-3 text-green-500 mt-5'>Listing your Searched results:</h1>
        </div>
    </div>
  )
}
