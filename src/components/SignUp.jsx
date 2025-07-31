import React from 'react';
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from '../config/firebaseAuth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adduserData, removeuserData } from '../utils/authSlice';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Handle Google Login
  async function handleAuth() {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = {
        name: result.user.displayName,
        photo: result.user.photoURL,
        email: result.user.email,
      };
      dispatch(adduserData(userData));
      navigate("/");  // Redirect to home
    } catch (error) {
      // console.error("Login Error:", error.message);
    }
  }

  // ✅ Handle Logout
  async function handleLogout() {
    try {
      await signOut(auth);
      dispatch(removeuserData());
      navigate("/login");  // Redirect to login page
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-xl p-6 sm:p-10 text-center space-y-6 w-full max-w-sm sm:max-w-md">
        <h2 className="text-2xl font-bold text-gray-700">Welcome to MyApp</h2>
        <p className="text-gray-500 text-sm sm:text-base">
          Sign in with your Google account to continue
        </p>

        <div className="space-y-4">
          <button
            onClick={handleAuth}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 text-sm sm:text-base"
          >
            Sign In with Google
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
