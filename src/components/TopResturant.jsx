import React, { useState } from 'react';
import ResturantCard from './ResturantCard';

export default function TopResturant({ data, title }) {
  const [value, setvalue] = useState(0);

  function handperve() {
    if (value > 0) setvalue((prev) => prev - 100);
  }

  function handnext() {
    if (value < 450) setvalue((prev) => prev + 100);
  }

  return (
    <div className='mt-14 px-4'>
      {/* Header and Arrows */}
      <div className='flex justify-between items-center mt-5'>
        <h1 className='font-bold text-xl sm:text-2xl'>{title}</h1>

        {/* Arrows hidden on small screens */}
        <div className='hidden sm:flex gap-2'>
          <div
            onClick={handperve}
            className={`rounded-full w-9 h-9 flex items-center justify-center cursor-pointer ${
              value <= 0 ? 'bg-gray-50' : 'bg-gray-200'
            }`}
          >
            <i
              className={`fi text-2xl fi-rr-arrow-small-left ${
                value <= 0 ? 'text-gray-200' : 'text-gray-800'
              }`}
            ></i>
          </div>
          <div
            onClick={handnext}
            className={`rounded-full w-9 h-9 flex items-center justify-center cursor-pointer ${
              value >= 450 ? 'bg-gray-100' : 'bg-gray-200'
            }`}
          >
            <i
              className={`fi text-2xl fi-rr-arrow-small-right ${
                value >= 450 ? 'text-gray-100' : 'text-gray-800'
              }`}
            ></i>
          </div>
        </div>
      </div>

      {/* Card List - Scrollable on mobile, arrow control on desktop */}
      <div
        className='flex gap-4 mt-4 sm:overflow-hidden overflow-x-auto scrollbar-hide'
        style={{ translate: `-${value}%` }}
      >
        {Array.isArray(data) &&
          data.map(({ info }) => (
            <div
              key={info.id}
              className='min-w-[250px] sm:min-w-[280px] hover:scale-95 duration-300'
            >
              <ResturantCard {...info} />
            </div>
          ))}
      </div>

      <hr className='border border-gray-300 mt-6' />
    </div>
  );
}
