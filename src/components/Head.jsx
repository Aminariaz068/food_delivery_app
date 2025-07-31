import React, { useContext, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { CardContext, Visibilty } from '../context/contextApi'
import { Coordinates } from '../context/contextApi'
import { useSelector } from 'react-redux'
import authSlice from '../utils/authSlice';

function Head() {
    const { visible, setvisible } = useContext(Visibilty)
    const [searchresult, setsearchresult] = useState([])
    const { setcoord } = useContext(Coordinates)
    const [adress, setadress] = useState("")
    const { cartdata } = useContext(CardContext)
    const userData = useSelector((state) => state.authSlice.userData)

    async function fetchresult(val) {
        if (val === "") return
        const data = await fetch(`/dapi/misc/place-autocomplete?input=${val}`)
        const res = await data.json()
        setsearchresult(res.data)
    }

    async function fetchlocation(id) {
        if (id === "") return
        handlevisibilty()
        const data = await fetch(`/dapi/misc/address-recommend?place_id=${id}`)
        const res = await data.json()
        setcoord({
            lat: res.data[0].geometry.location.lat,
            lng: res.data[0].geometry.location.lng
        })
        setadress(res.data[0].formatted_address);
    }

    function handlevisibilty() {
        setvisible((prev) => !prev)
    }

    return (
        <div className='relative w-full'>
            <div className='w-full'>
                <div onClick={handlevisibilty} className={`w-full bg-black/40 z-40 h-full fixed ${visible ? "visible" : "invisible"}`}></div>
                <div className={`bg-white w-[80%] sm:w-[60%] md:w-[40%] flex justify-end h-full z-50 p-3 duration-500 fixed ${visible ? "left-0" : "-left-[100%]"}`}>
                    <div className='flex gap-3 flex-col w-full me-6'>
                        <i onClick={handlevisibilty} className="fi fi-br-x cursor-pointer"></i>
                        <input type="text" className='border border-slate-400 mt-3 p-3 focus:outline-none focus:shadow-lg' onChange={(e) => fetchresult(e.target.value)} />
                        <div className='mt-3 border border-slate-400 p-3'>
                            <ul>
                                {searchresult.map((data, index) => {
                                    const islast = (index === searchresult.length - 1)
                                    return (
                                        <div className='my-5' key={index}>
                                            <div className='flex items-center'>
                                                <i className="fi fi-rr-marker"></i>
                                                <li className='cursor-pointer ml-3 mt-1' onClick={() => fetchlocation(data.place_id)}>
                                                    {data.structured_formatting.main_text}
                                                    <p className='text-sm opacity-60 cursor-pointer'>{data.structured_formatting.secondary_text}</p>
                                                </li>
                                            </div>
                                            {!islast && <p className='opacity-45'>------------------------------</p>}
                                        </div>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navbar */}
            <div className='sticky top-0 z-30 bg-white shadow-md h-20 flex justify-center items-center'>
                <div className='w-full max-w-screen-xl px-2 sm:px-4 flex flex-wrap sm:flex-nowrap justify-between mx-auto'>
                    <div className='flex items-center gap-2'>
                        <div className='w-16 sm:w-20 md:w-24'>
                            <Link to={'/'}>
                                <img src="https://logolook.net/wp-content/uploads/2023/04/Swiggy-Logo.png" alt="Swiggy Logo" />
                            </Link>
                        </div>

                        <div className='flex items-center gap-2 cursor-pointer' onClick={handlevisibilty}>
                            <p className='font-bold border-b-2 border-black flex mt-1 items-center text-xs sm:text-sm'>
                                others <span className='ml-2 sm:ml-4 text-xs sm:text-sm opacity-40 truncate max-w-[100px] sm:max-w-[200px]'>{adress}</span>
                            </p>
                            <i className="fi fi-rr-angle-small-down mt-2 text-lg sm:text-2xl text-orange-500"></i>
                        </div>
                    </div>

                    <div className='flex items-center gap-3 mt-2 sm:mt-0'>
                        <Link to={'/search'}>
                            <div className='flex items-center'>
                                <i className="fi fi-rr-search"></i>
                                <p className="text-xs sm:text-sm ml-1 sm:ml-2">search</p>
                            </div>
                        </Link>

                        {userData ? (
                            <Link to={'/signin'}>
                                <div className='flex items-center'>
                                    <img className='w-8 sm:w-10 rounded-full' src={userData.photo} alt="User" />
                                    <p className='text-xs sm:text-sm hidden sm:block ml-2 mt-1'>{userData.name}</p>
                                </div>
                            </Link>
                        ) : (
                            <div className='flex items-center'>
                                <i className="fi fi-rr-user"></i>
                                <Link to={'/signin'}>
                                    <p className='text-xs sm:text-sm ml-1 sm:ml-2 hidden sm:block'>sign In</p>
                                </Link>
                            </div>
                        )}

                        <div className='flex items-center'>
                            <p className="text-xs sm:text-sm hidden sm:block ml-2">cart</p>
                            <Link to={'/Cart'}>
                                <i className="fi ml-2 fi-rr-shopping-cart-add"></i>
                            </Link>
                            <p className="text-xs sm:text-sm ">{cartdata.length}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Head