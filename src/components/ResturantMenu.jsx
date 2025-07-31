import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CardContext, Coordinates } from '../context/contextApi';
import toast from 'react-hot-toast';

function ResturantMenu() {
  const { id } = useParams();
  const [menudata, setmenudata] = useState([]);
  const [menuinfo, setmenuinfo] = useState([]);
  const [discountdata, setdiscountdata] = useState([]);
  const [value, setvalue] = useState(0);
  const { coord: { lat, lng } } = useContext(Coordinates);

  async function fetchmenu() {
    const data = await fetch(`${import.meta.env.VITE_BASE_URL}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`);
    const res = await data.json();
    // console.log(res)
    const resinfo = res?.data?.cards.find((data) => data?.card?.card?.["@type"].includes("food.v2.Restaurant"))?.card?.card?.info
    setmenuinfo(resinfo);
    const discountinfo = res?.data?.cards.find((data) => data?.card?.card?.["@type"].includes("v2.GridWidget"))?.card?.card?.gridElements?.infoWithStyle?.offers
    setdiscountdata(discountinfo);


    // const menuresinfo = (res?.data?.cards.find((data) => data?.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards)
    // .filter((data)=>data?.card?.card?.itemCards ||data?.card?.card?.categories)
    // setmenudata(menuresinfo);
    let groupedCard = res?.data?.cards.find(
  (card) => card?.groupedCard?.cardGroupMap?.REGULAR
)?.groupedCard?.cardGroupMap?.REGULAR?.cards;

let actualmenu = Array.isArray(groupedCard)
  ? groupedCard.filter((data) =>
      data?.card?.card?.itemCards?.length > 0 || data?.card?.card?.categories?.length > 0
    )
  : [];

setmenudata(actualmenu);
// console.log(actualmenu);


    
  }

  useEffect(() => {
    if (lat && lng && id) {
      fetchmenu();
    }
  }, [lat, lng, id]);

  return (
    <div className='w-full px-2 sm:px-4 md:px-8'>
      <div className='max-w-screen-lg mx-auto mt-5'>
        <p>
          <Link to={'/'}><span className='text-slate-500 hover:text-slate-900'>Home</span></Link> /
          <span className='text-slate-500 hover:text-slate-900'> {menuinfo.city} </span>/
          <span className='text-slate-500 hover:text-slate-900'> {menuinfo.name}</span>
        </p>
        <h1 className='font-bold pt-6 text-2xl'>{menuinfo.name}</h1>

        {/* Menu Info Section */}
        <div className='w-full mt-3 rounded-2xl bg-gradient-to-t from-slate-300 p-4'>
          <div className='rounded-2xl bg-white p-4'>
            <div className='flex flex-wrap items-center gap-3 font-semibold'>
              <i className="fi text-green-500 text-lg fi-sr-circle-star"></i>
              <span>{menuinfo.avgRating}</span>
              <span>({menuinfo.totalRatingsString})</span>
              <span>{menuinfo.costForTwoMessage}</span>
            </div>
            <p className='underline font-semibold text-orange-700'>{menuinfo?.cuisines?.join(", ")}</p>
            <p className='font-semibold mt-2'>Outlet: <span className='text-gray-500'>{menuinfo.locality}</span></p>
            <p className='font-semibold'>{menuinfo?.sla?.slaString}</p>
            <hr className='my-2' />
            <div className='flex items-center gap-2'>
              <i className="fi font-bold text-2xl fi-sr-shipping-fast"></i>
              <span>{menuinfo?.aggregatedDiscountInfo?.descriptionList[0]?.meta}</span>
            </div>
          </div>
        </div>

        {/* Deals Section */}
        <div className='w-full mt-5'>
          <div className='flex justify-between items-center'>
            <h1 className='font-bold text-2xl'>Deals For You</h1>
            <div className='flex gap-2'>
              <button onClick={() => setvalue(value <= 0 ? 0 : value - 150)} className='p-2 rounded-full bg-gray-200'>
                <i className='fi fi-rr-arrow-small-left'></i>
              </button>
              <button onClick={() => setvalue(value >= 300 ? 300 : value + 150)} className='p-2 rounded-full bg-gray-200'>
                <i className='fi fi-rr-arrow-small-right'></i>
              </button>
            </div>
          </div>
          <div className='overflow-x-auto mt-5'>
            <div className='flex gap-4 transition-transform duration-300' style={{ transform: `translateX(-${value}px)` }}>
              {discountdata.map((data, idx) => <Discount key={idx} data={data} />)}
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <h2 className='text-center mt-6 font-bold text-xl'>Menu</h2>
        <div className='mt-4'>
          {menudata.length > 0 ? (
            menudata.map(({ card: { card } }, idx) => <Menucard key={idx} card={card} />)
          ) : (
            <p>No menu items available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Discount({ data: { info: { header, offerLogo, couponCode } } }) {
  return (
    <div className='min-w-[250px] flex items-center border rounded-2xl p-3 bg-white shadow'>
      <img className='w-16 h-16 object-cover rounded' src={`https://media-assets.swiggy.com/swiggy/image/upload/${offerLogo}`} alt='' />
      <div className='ml-4'>
        <h2 className='font-bold'>{header}</h2>
        <p className='text-sm text-gray-600'>{couponCode}</p>
      </div>
    </div>
  );
}

function Menucard({ card }) {
  const [isOpen, setIsOpen] = useState(true);

  if (card.itemCards) {
    const { title, itemCards } = card;
    return (
      <div className='mt-5'>
        <div className='flex justify-between items-center'>
          <h3 className='text-xl font-bold'>{title} ({itemCards.length})</h3>
          <button onClick={() => setIsOpen(!isOpen)}>
            <i className={`fi text-2xl fi-rr-angle-small-${isOpen ? "up" : "down"}`}></i>
          </button>
        </div>
        {isOpen && (
          <div className='mt-3'>
            {itemCards.map((item, idx) => <Detailmenu key={idx} info={item.card.info} />)}
          </div>
        )}
        <hr className='my-4 border-gray-300' />
      </div>
    );
  } else {
    return (
      <div className='mt-5'>
        <h3 className='text-xl font-bold'>{card.title}</h3>
        {card.categories.map((data, idx) => <Menucard key={idx} card={data} />)}
      </div>
    );
  }
}

function Detailmenu({ info }) {
  const { name, price, description, imageId, itemAttribute: { vegClassifier }, ratings: { aggregatedRating: { rating, ratingCountV2 } } } = info;
  const { cartdata, setcartdata } = useContext(CardContext);

  function handleAddtocart() {
    const exists = cartdata.some(item => item.id === info.id);
    if (!exists) {
      const newCart = [...cartdata, info];
      setcartdata(newCart);
      localStorage.setItem('cartdata', JSON.stringify(newCart));
      toast.success("Item added to cart");
    } else {
      toast.error("Item already in cart");
    }
  }

  return (
    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4'>
      <div className='sm:w-3/4'>
        <img
          src={vegClassifier === "VEG" ? "https://i.pinimg.com/736x/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.jpg" : "https://cdn.vectorstock.com/i/1000v/00/43/non-vegetarian-sign-veg-logo-symbol-vector-50890043.jpg"}
          alt={vegClassifier}
          className='w-6 h-6 mb-1'
        />
        <h4 className='font-bold text-lg'>{name}</h4>
        <p className='text-gray-700'>₹{price / 100}</p>
        <p className='text-gray-600'>Rating: {rating} ({ratingCountV2})</p>
        <p className='text-sm text-gray-600 mt-1'>{description}</p>
      </div>
      <div className='sm:w-1/4 relative'>
        <img className='w-full rounded-lg' src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`} alt='' />
        <button onClick={handleAddtocart} className='absolute bottom-2 left-2 bg-green-600 text-white py-1 px-3 rounded text-sm'>Add</button>
      </div>
    </div>
  );
}

export default ResturantMenu;
