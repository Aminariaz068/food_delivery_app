import React, { useState } from 'react';
import ResturantCard from './ResturantCard';
import { useDispatch } from 'react-redux';
import { setfiltervalue } from '../utils/filterSlice';

function OnlineFoodDelivery({ data, title }) {
  const filteroption = [
    { filtername: "Ratings 4+" },
    { filtername: "Offers" },
    { filtername: "Rs. 300-Rs. 600+" },
    { filtername: "Less than Rs. 300" },
  ];

  const dispatch = useDispatch();
  const [activebtn, setactivebtn] = useState(null);

  function handlefilterbtn(filtername) {
    setactivebtn(activebtn === filtername ? null : filtername);
  }

  // Dispatch inside useEffect to prevent re-renders
  React.useEffect(() => {
    dispatch(setfiltervalue(activebtn));
  }, [activebtn, dispatch]);

  return (
    <div className='w-full px-4 sm:px-6 md:px-8 lg:px-12 mt-6'>
      <h1 className='font-bold text-xl sm:text-2xl mb-4'>{title}</h1>

      <div className='my-5 flex flex-wrap gap-3'>
        {filteroption.map((data) => (
          <button
            key={data.filtername}
            onClick={() => handlefilterbtn(data.filtername)}
            className={
              'flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-sm sm:text-base hover:shadow-md duration-200 ' +
              (activebtn === data.filtername ? 'bg-orange-100 border-orange-500' : '')
            }
          >
            <p>{data.filtername}</p>
            {activebtn === data.filtername && (
              <i className="fi fi-rr-cross-small text-sm"></i>
            )}
          </button>
        ))}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {Array.isArray(data) &&
          data.map(({ info }, idx) => (
            <div key={idx} className='hover:scale-95 duration-300'>
              <ResturantCard {...info} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default OnlineFoodDelivery;
