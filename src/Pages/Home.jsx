import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { GlobalContext } from '../context/Context';

export default function Home() {
  const [user] = useContext(GlobalContext);
  const navigate = useNavigate();

  // Safely check if user data exists to prevent crashes
  const userData = user?.user;

  if (!userData) {
    return (
      <div className="min-h-screen w-full flex flex-col justify-center items-center bg-[#0A0B0D] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <h1 className="text-2xl font-black text-white tracking-wider animate-pulse">Loading Profile...</h1>
      </div>
    );
  }

  const handleLogout = () => {
    // Context clear logic (Optional but good practice):
    // dispatch({ type: 'USER_LOGOUT' });
    localStorage.removeItem('Token');
    navigate('/login'); // Redirects back to login
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 sm:p-12 md:p-16 bg-[#0A0B0D]">
      
      {/* Profile Card Container - Styled to match the Login screen */}
      <div className="w-full max-w-xl bg-[#0F1014] p-10 md:p-14 rounded-[3rem] shadow-2xl flex flex-col items-center border border-[#3A3B40]/30 transition-all">
        
        {/* Screen Title - Extra Bold & Large */}
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-10">
          User Profile
        </h1>

        {/* High-Tech Avatar with Premium Glow */}
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-indigo-600/30 blur-2xl opacity-60 animate-pulse"></div>
          <div className="relative w-40 h-40 rounded-full border-[6px] border-indigo-600 overflow-hidden bg-[#292A2E] p-1 shadow-2xl">
            <img
              src={userData.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2064&auto=format&fit=crop'}
              alt="Profile Avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

        {/* User Identity Section */}
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            {userData.firstName} {userData.lastName}
          </h2>
          <p className="text-[#8E9096] text-lg md:text-xl font-bold tracking-wide">
            @{userData.username}
          </p>
        </div>

        {/* Detailed Info Rows (Large & High-Contrast) */}
        <div className="w-full space-y-6 mb-12">
          
          {/* Email Card */}
          <div className="flex justify-between items-center bg-[#131419] px-7 py-6 rounded-2xl border-l-8 border-indigo-600 shadow-md">
            <span className="text-[#3B82F6] font-black text-lg sm:text-xl tracking-wider uppercase">
              Email
            </span>
            <span className="text-white text-base sm:text-lg font-bold truncate max-w-[260px] md:max-w-[320px]">
              {userData.email}
            </span>
          </div>

          {/* Age Card */}
          <div className="flex justify-between items-center bg-[#131419] px-7 py-6 rounded-2xl border-l-8 border-indigo-600 shadow-md">
            <span className="text-[#3B82F6] font-black text-lg sm:text-xl tracking-wider uppercase">
              Age
            </span>
            <span className="text-white text-lg sm:text-xl font-black bg-[#202127] px-4 py-1.5 rounded-xl border border-[#3A3B40]/20">
              {userData.age} Yrs
            </span>
          </div>

          {/* Gender Card */}
          <div className="flex justify-between items-center bg-[#131419] px-7 py-6 rounded-2xl border-l-8 border-indigo-600 shadow-md">
            <span className="text-[#3B82F6] font-black text-lg sm:text-xl tracking-wider uppercase">
              Gender
            </span>
            <span className="text-white text-lg sm:text-xl font-black capitalize bg-[#202127] px-4 py-1.5 rounded-xl border border-[#3A3B40]/20">
              {userData.gender}
            </span>
          </div>

        </div>

        {/* High-Contrast Bold Danger Button */}
        <button
          onClick={handleLogout}
          className="w-full py-5 rounded-2xl bg-gradient-to-r from-red-700 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-black text-xl sm:text-2xl tracking-wider transition-all duration-200 active:scale-[0.97] shadow-xl shadow-red-950/40"
        >
          Logout Account
        </button>

      </div>

    </div>
  );
}