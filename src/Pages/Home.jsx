import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { GlobalContext } from '../context/Context';

export default function Home() {
  const [user, dispatch] = useContext(GlobalContext); // Dispatch nikala taaki state sahi se clear ho sake
  const navigate = useNavigate();

  // Safely check if user data exists to prevent crashes
  const userData = user?.user;

  if (!userData) {
    return (
      <div className="min-h-screen w-full flex flex-col justify-center items-center bg-[#0A0B0D] space-y-3">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <h1 className="text-xl font-bold text-white tracking-wider animate-pulse">Loading Profile...</h1>
      </div>
    );
  }

  const handleLogout = () => {
    dispatch({ type: 'USER_LOGOUT' }); // Logout state ko clear karne ke liye dispatch kiya
    localStorage.removeItem('Token');
    navigate('/login'); // Redirects back to login
  };

  return (
    // md:h-screen aur overflow-hidden se laptop screens par height tight aur fixed rahegi
    <div className="min-h-screen w-full flex items-center justify-center py-5 p-4 sm:p-8 bg-[#0A0B0D] overflow-hidden">
      
      {/* Profile Card Container - Tightened padding & border-radius */}
      <div className="w-full max-w-lg bg-[#0F1014] p-6 sm:p-10 md:p-12 rounded-[2rem] shadow-2xl flex flex-col items-center border border-[#3A3B40]/30 transition-all my-auto overflow-y-auto">
        
        {/* Screen Title - Reduced size to text-3xl */}
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-6">
          User Profile
        </h1>

        {/* High-Tech Avatar with Premium Glow - Reduced avatar size from w-40 h-40 to w-28 h-28 */}
        <div className="relative mb-5">
          <div className="absolute inset-0 rounded-full bg-indigo-600/20 blur-2xl opacity-60"></div>
          <div className="relative w-28 h-28 rounded-full border-4 border-indigo-600 overflow-hidden bg-[#292A2E] p-0.5 shadow-xl">
            <img
              src={userData.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2064&auto=format&fit=crop'}
              alt="Profile Avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

        {/* User Identity Section - Reduced spacing & fonts */}
        <div className="text-center mb-6 space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {userData.firstName} {userData.lastName}
          </h2>
          <p className="text-[#8E9096] text-sm sm:text-base font-semibold tracking-wide">
            @{userData.username}
          </p>
        </div>

        {/* Detailed Info Rows (Compact padding, heights, and fonts) */}
        <div className="w-full space-y-4 mb-8">
          
          {/* Email Card */}
          <div className="flex justify-between items-center bg-[#131419] px-5 py-4 rounded-xl border-l-4 border-indigo-600 shadow-md">
            <span className="text-[#3B82F6] font-bold text-xs sm:text-sm tracking-wider uppercase">
              Email
            </span>
            <span className="text-white text-xs sm:text-sm font-semibold truncate max-w-[180px] sm:max-w-[240px]">
              {userData.email}
            </span>
          </div>

          {/* Age Card */}
          <div className="flex justify-between items-center bg-[#131419] px-5 py-4 rounded-xl border-l-4 border-indigo-600 shadow-md">
            <span className="text-[#3B82F6] font-bold text-xs sm:text-sm tracking-wider uppercase">
              Age
            </span>
            <span className="text-white text-xs sm:text-sm font-bold bg-[#202127] px-3 py-1 rounded-lg border border-[#3A3B40]/20">
              {userData.age} Yrs
            </span>
          </div>

          {/* Gender Card */}
          <div className="flex justify-between items-center bg-[#131419] px-5 py-4 rounded-xl border-l-4 border-indigo-600 shadow-md">
            <span className="text-[#3B82F6] font-bold text-xs sm:text-sm tracking-wider uppercase">
              Gender
            </span>
            <span className="text-white text-xs sm:text-sm font-bold capitalize bg-[#202127] px-3 py-1 rounded-lg border border-[#3A3B40]/20">
              {userData.gender}
            </span>
          </div>

        </div>

        {/* High-Contrast Bold Danger Button - Smaller font (text-base) and padding */}
        <button
          onClick={handleLogout}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-red-700 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-black text-base sm:text-lg tracking-wider transition-all duration-200 active:scale-[0.97] shadow-lg shadow-red-950/40"
        >
          Logout Account
        </button>

      </div>

    </div>
  );
}