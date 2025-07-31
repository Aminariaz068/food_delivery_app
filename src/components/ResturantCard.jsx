import React from 'react';
import { Link } from 'react-router-dom';

function ResturantCard(info) {
  const {
    id,
    cloudinaryImageId,
    name,
    avgRating,
    sla,
    cuisines = [],
    locality,
    aggregatedDiscountInfoV3 = {},
  } = info;

  const discountHeader = aggregatedDiscountInfoV3?.header || "";
  const discountSubHeader = aggregatedDiscountInfoV3?.subHeader || "";

  return (
    <Link to={`/res/${id}`}>
      <div className="min-w-full sm:min-w-[250px] md:min-w-[220px] rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-lg duration-300">
        {/* Image Section */}
        <div className="relative h-40 sm:h-48 md:h-44 w-full">
          <img
            className="w-full h-full object-cover"
            src={`https://media-assets.swiggy.com/swiggy/image/upload/${cloudinaryImageId}`}
            alt={name}
          />
          {/* Overlay Gradient */}
          <div className="absolute top-0 w-full h-full bg-gradient-to-t from-black opacity-50 rounded-2xl"></div>
          {/* Discount Text */}
          {(discountHeader || discountSubHeader) && (
            <div className="absolute bottom-1 left-2 text-white text-sm sm:text-lg font-bold">
              {discountHeader} {discountSubHeader}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="p-3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">{name}</h3>
          <p className="flex items-center text-sm sm:text-base font-medium text-gray-700 mt-1 gap-1">
            <i className="fi text-green-500 text-sm sm:text-lg fi-sr-circle-star"></i> 
            {avgRating} • <span>{sla?.slaString}</span>
          </p>
          <p className="line-clamp-1 text-sm sm:text-base text-gray-600 mt-1">
            {cuisines.join(", ")}
          </p>
          <p className="line-clamp-1 text-sm sm:text-base text-gray-600">{locality}</p>
        </div>
      </div>
    </Link>
  );
}

export default ResturantCard;
