import React, { useEffect, useState } from 'react'

function OnYourMind({data}) {
    const [value, setvalue] = useState(0);

    // async function fetchdata() {
    //     setdata(data2[0]?.data?.cards[0]?.card?.card?.imageGridCards?.info);
    //     // console.log(data2[0]?.data?.cards[0]?.card?.card?.imageGridCards?.info);


    // }
    // useEffect(() => {
    //     fetchdata();

    // }, [])

    function handperve() {
        value <= 0 ? "" : setvalue((prev) => prev - 31)

    }

    function handnext() {
        value >= 124 ? "" : setvalue((prev) => prev + 31)
    }
    return (
        <div>
            <div className='flex justify-between mt-5'>
                <h1 className='font-bold text-2xl '>what's in your mind</h1>
                <div className='flex gap-2' >
                    <div onClick={handperve} className={`rounded-full w-9 h-9 flex items-center justify-center ` + (value <= 0 ? "bg-gray-50" : "bg-gray-200")} >
                        <i class={`fi text-2xl mt-1 cursor-pointer fi-rr-arrow-small-left ` + (value <= 0 ? "text-gray-200" : "text-gray-800")}></i>
                    </div>
                    <div onClick={handnext} className={`rounded-full w-9 h-9 flex items-center justify-center ` + (value <= 0 ? "bg-gray-100" : "bg-gray-200")}>
                        <i class={`fi text-2xl mt-1 cursor-pointer fi-rr-arrow-small-right ` + (value >= 124 ? "text-gray-100" : "text-gray-800")}></i>
                    </div>
                </div>
            </div>
            <div
                style={{ translate: `-${value}%` }}
                className={`flex mt-5 duration-300`}>
                  {
          Array.isArray(data) && data.map((item) => (
            <img key={item.id} className='w-30' 
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,w_180,h_260/${item.imageId}`} 
              alt="" />
          ))
        }
            </div>
            <hr className='border text-gray-300' />

        </div>
    )
}

export default OnYourMind