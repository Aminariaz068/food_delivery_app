import React, { useContext, useEffect, useState } from 'react'
import OnYourMind from './OnYourMind';
import TopResturant from './TopResturant';
import OnlineFoodDelivery from './OnlineFoodDelivery';
import { Coordinates } from '../context/contextApi';
import { useSelector } from 'react-redux';


function Body() {
    const [onyourmind, setonyourmind] = useState("")
    const [topresturant, settopresturant] = useState([]);
    const {coord:{lat,lng}} = useContext(Coordinates)
    const [toprestitle,settoprestitle] = useState("")
    const [onlinetitle,setonlinetitle] = useState("")
    const [data,setdata] = useState({})

  
      
    async function fetchdata() {
  const data = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`);
  const res = await data.json();
//   console.log(res);
// console.log(res?.data?.cards[0]?.card?.card?.imageGridCards?.info )
  
  let maindata = res?.data?.cards.find((data)=> data?.card?.card?.id== "top_brands_for_you")?.card
  ?.card?.gridElements?.infoWithStyle?.restaurants
//   settopresturant(maindata);

    let maindata2 = res?.data?.cards.find((data)=> data?.card?.card?.id== "restaurant_grid_listing_v2")
  ?.card?.card?.gridElements?.infoWithStyle?.restaurants
  settopresturant(maindata || maindata2);
//   let data2 = res?.data?.cards[0]?.card?.card?.imageGridCards?.info
//   setonyourmind(data2);
//   console.log(data2)
  let data2 = res?.data?.cards.find((data)=> data?.card?.card?.id== "whats_on_your_mind")
  ?.card?.card?.imageGridCards?.info
  setonyourmind(data2);
//   console.log(data2)
//   whats_on_your_mind


//   console.log(maindata)
  settoprestitle(res?.data?.cards[1]?.card?.card?.header?.title)
  setonlinetitle(res?.data?.cards[2]?.card?.card?.title)
  setdata(res.data)
   
       }
       useEffect(() => {
           fetchdata();
   
       }, [lat,lng])

       const filterVal = useSelector(state =>state.filterSlice.filterVal)
       const filterData = topresturant.filter(item=>{
        if(!filterVal) return true;
        switch(filterVal){
            case "Ratings 4+": return item?.info?.avgRating >4
            case "Offers": 
            case "Rs. 300-Rs. 600":return  item?.info?.costForTwo?.slice(1,4) >= "300" && item?.info?.costForTwo?.slice(1,4) <="600"
             case "Less than Rs. 300": return  item?.info?.costForTwo?.slice(1,4) >= "300"
             default: return true;
        }
       })
       
      

   

   if(data.communication){
    return <div className='flex h- justify-center items-center  flex-col'>
        <img className='w-72' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png" alt="" />
        <h1>location unserviceAble</h1>
    </div>
   }

    return (
        <div className='w-full'>
            <div className='w-[80%] mx-auto  overflow-hidden'>   
                {
                    onyourmind?.length > 0? (
                    <>
                     <OnYourMind data={onyourmind}/>
                    <TopResturant data={topresturant} title = {toprestitle}/>
                    </>
               ): "" }  
                    {/* <OnYourMind data={onyourmind}/>
                    <TopResturant data={topresturant} title = {toprestitle}/> */}
                    <OnlineFoodDelivery data={filterVal?filterData : topresturant} title={onlinetitle}/>
            </div>
        </div>
    )
}

export default Body