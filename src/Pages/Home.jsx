import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { GlobalContext } from '../context/Context';

// Mock User Data

export default function Home() {

  const [user, dispatch] = useContext(GlobalContext)
  const navigate = useNavigate();
  const MOCK_USER = {
    firstName: user.user.firstName,
    lastName: user.user.lastName,
    username: user.user.username,
    email: user.user.email,
    age: user.user.age,
    gender: user.user.gender,
    avatar: user.user.image || null
    }

    if(!MOCK_USER){
      return <h1>Loading...</h1>;
    }


  const handleLogout = () => {
    navigate('/login'); // Redirects back to login
  };

  return (
    /* Width increased to max-w-lg (approx 512px) for a grander layout */
    <div className="w-full max-w-lg bg-[#12131C] p-10 rounded-[2.5rem] shadow-2xl flex flex-col items-center border border-slate-800/40">
      
      {/* Title font set to text-4xl */}
      <h1 className="text-4xl font-extrabold text-white tracking-wide mb-8">
        Profile
      </h1>

      {/* Larger Avatar with Glow Effect */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-blue-600/30 blur-lg opacity-50 animate-pulse"></div>
        <div className="relative w-36 h-36 rounded-full border-[4px] border-blue-600 overflow-hidden bg-slate-800 p-0.5">
          <img
            src={user.user.image || 'https://pgnm.inmg.fr/wp-content/uploads/2019/05/LogoINMG.jpg'}
            alt="Profile Avatar"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>

      {/* User Name & Username font sizes boosted */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-100">
          {user.user.firstName} {user.user.lastName}
        </h2>
        <p className="text-slate-400 text-md mt-1.5 font-medium">
          @{user.user.username}
        </p>
      </div>

      {/* Spacing & Font inside rows increased */}
      <div className="w-full space-y-5 mb-10">
        {/* Email Row */}
        <div className="flex justify-between items-center bg-[#181922] px-6 py-5 rounded-2xl border-l-[4px] border-blue-600">
          <span className="text-blue-500 font-extrabold text-md">Email</span>
          <span className="text-slate-300 text-sm font-medium truncate max-w-[240px]">
            {user.user.email}
          </span>
        </div>

        {/* Age Row */}
        <div className="flex justify-between items-center bg-[#181922] px-6 py-5 rounded-2xl border-l-[4px] border-blue-600">
          <span className="text-blue-500 font-extrabold text-md">Age</span>
          <span className="text-slate-300 text-sm font-semibold">{user.user.age}</span>
        </div>

        {/* Gender Row */}
        <div className="flex justify-between items-center bg-[#181922] px-6 py-5 rounded-2xl border-l-[4px] border-blue-600">
          <span className="text-blue-500 font-extrabold text-md">Gender</span>
          <span className="text-slate-300 text-sm font-semibold lowercase">{user.user.gender}</span>
        </div>
      </div>

      {/* Extra Bold Orange-Red Gradient Button */}
      <button
        onClick={handleLogout}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-700 hover:to-amber-600 text-white font-extrabold text-lg tracking-wide transition-all active:scale-95 shadow-xl"
      >
        Logout
      </button>

    </div>
  );
}