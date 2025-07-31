import React, { useEffect, useState } from 'react';

function Search() {
  const [searchquary, setsearchquery] = useState("");
  const [dishes, setdishes] = useState([]);
  const [resturant, setresturant] = useState([]);
  const [search, setsearchbtn] = useState("Dishes");

  const searchbtn = [
    { searchName: "Resturant" },
    { searchName: "Dishes" },
  ];

  function searching(searchName) {
    setsearchbtn(search === searchName ? null : searchName);
  }

  useEffect(() => {
    if (searchquary.trim() === "") return;

    fetchDishes();
    fetchResturant();
  }, [searchquary]);

  async function fetchDishes() {
    const data = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=28.7040592&lng=77.10249019999999&str=${searchquary}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0`);
    const res = await data.json();
    const dishList = (res?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards || []).filter(
      (data) => data?.card?.card?.info
    );
    setdishes(dishList);
  }

  async function fetchResturant() {
    const data = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=28.7040592&lng=77.10249019999999&str=${searchquary}&trackingId=undefined&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0&selectedPLTab=RESTAURANT`);
    const res1 = await data.json();
    const restList = (res1?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards || []).filter(
      (data) => data?.card?.card?.info
    );
    setresturant(restList);
  }

  return (
    <div className="max-w-[1200px] mt-5 mx-auto px-4">
      {/* Search Input */}
      <input
        value={searchquary}
        onChange={(e) => setsearchquery(e.target.value)}
        className="py-3 border border-gray-300 rounded-xl px-4 w-full text-base"
        type="text"
        placeholder="Search for restaurant and food"
      />

      {/* Search Buttons */}
      <div className="flex flex-wrap gap-2 mt-4">
        {searchbtn.map((data, index) => (
          <button
            key={index}
            onClick={() => searching(data.searchName)}
            className={`border flex gap-2 border-gray-300 p-2 sm:p-3 rounded-2xl text-sm sm:text-base ${
              search === data.searchName ? "bg-blue-200" : ""
            }`}
          >
            <p>{data.searchName}</p>
          </button>
        ))}
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {search === "Dishes"
          ? dishes.map((item, index) => {
              const info = item?.card?.card?.info;
              const imageId = info?.imageId ?? "";
              const name = info?.name ?? "No Name";
              const price = (info?.price || info?.defaultPrice || 0) / 100;
              const isVeg = info?.isVeg === 1;

              return (
                <div key={index} className="border p-3 rounded-lg shadow hover:shadow-md duration-200">
                  <img
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`}
                    alt={name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h2 className="text-lg font-semibold mt-2">{name}</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Price: ₹{price} | {isVeg ? "Veg 🌱" : "Non-Veg 🍗"}
                  </p>
                </div>
              );
            })
          : resturant.map((item, index) => {
              const info = item?.card?.card?.info;
              const name = info?.name ?? "No Name";
              const imageId = info?.cloudinaryImageId ?? "";
              const cuisines = info?.cuisines?.join(", ") ?? "";
              const rating = info?.avgRating ?? "N/A";
              const deliveryTime = info?.sla?.slaString ?? "";
              const cost = info?.costForTwoMessage ?? "";

              return (
                <div key={index} className="border p-3 rounded-lg shadow hover:shadow-md duration-200">
                  <img
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`}
                    alt={name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h2 className="text-lg font-semibold mt-2">{name}</h2>
                  <p className="text-sm text-gray-600 mt-1">{cuisines}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    ⭐ {rating} | {deliveryTime}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{cost}</p>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default Search;
