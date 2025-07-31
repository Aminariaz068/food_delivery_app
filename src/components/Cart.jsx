import React, { useContext } from 'react';
import { CardContext } from '../context/contextApi';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function Cart() {
    const { cartdata, setcartdata } = useContext(CardContext);
    let totalprice = cartdata.reduce(
        (acc, curVal) => acc + (curVal.price / 100 || curVal.defaultPrice / 100), 0);
    const userData = useSelector((state) => state.authSlice.userData);
    const navigate = useNavigate();

    function handleremove(i) {
        let newarry = [...cartdata];
        newarry.splice(i, 1);
        setcartdata(newarry);
        localStorage.setItem("cartdata", JSON.stringify(newarry));
        toast.success("Item removed from cart");
    }

    function handleplaceorder() {
        if (!userData) {
            toast.error("Please login to place order");
            navigate("/signin");
            return;
        }
        toast.success("Order placed successfully");
    }

    function handleclearcart() {
        setcartdata([]);
        toast.success("Cart cleared");
        localStorage.clear();
    }

    if (cartdata.length === 0) {
        return (
            <div className='w-full px-4'>
                <div className='max-w-xl mx-auto mt-10 text-center'>
                    <h2 className='text-2xl font-bold mb-4'>Cart is Empty</h2>
                    <Link to={"/"}>
                        <button className='bg-white font-bold border border-red-500 drop-shadow px-4 py-2 rounded text-red-700'>
                            Go to Home Page to Order
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className='w-full px-4'>
            <div className='max-w-4xl mx-auto mt-8'>
                {
                    cartdata.map((data, i) => (
                        <div key={i} className='flex flex-col sm:flex-row bg-rose-200 justify-between items-center my-5 p-4 rounded-md shadow-md'>
                            <div className='flex flex-col text-white font-bold w-full sm:w-2/3'>
                                <h2 className='text-xl sm:text-2xl mb-2'>{data.name}</h2>
                                <p>Price: ₹{data.price / 100 || data.defaultPrice / 100}</p>
                            </div>
                            <div className='relative w-full sm:w-[200px] mt-4 sm:mt-0'>
                                <img className='w-full h-auto rounded' 
                                     src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + data?.imageId} 
                                     alt={data.name} />
                                <button 
                                    onClick={() => handleremove(i)} 
                                    className='absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white text-red-600 font-bold border drop-shadow px-4 py-1 rounded-md text-sm'>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                }

                <div className='text-right font-bold text-lg mt-6'>
                    Total Price: ₹{totalprice.toFixed(2)}
                </div>

                <div className='flex flex-col sm:flex-row justify-between mt-6 gap-4'>
                    <button 
                        onClick={handleplaceorder} 
                        className='bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full sm:w-auto'>
                        Place Order
                    </button>
                    <button 
                        onClick={handleclearcart} 
                        className='bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 w-full sm:w-auto'>
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
