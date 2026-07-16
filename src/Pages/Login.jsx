import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { GlobalContext } from '../context/Context';

export default function Login() {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [, dispatch] = useContext(GlobalContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (usernameInput.trim() && passwordInput.length >= 6) {
      setError('');
      try {
        const apiRes = await axios.post('https://dummyjson.com/auth/login', { 
          username: usernameInput,
          password: passwordInput 
        })
        dispatch({ type: 'USER_LOGIN', user: apiRes.data })
        console.log(apiRes.data);

        navigate('/home'); 
        
        localStorage.setItem('Token', apiRes.data.accessToken)
        
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Invalid Username or Password');
      }
    } else {
      setError('Password must be at least 6 characters.');
    }
  };

  return (
    // md:h-screen se screen height lock ho jayegi laptop/PC par
    <div className="min-h-screen md:h-screen w-full flex flex-col md:flex-row bg-[#0A0B0D] overflow-hidden">
      
      {/* Left Banner Side - 60% Width & Fitted Height */}
      <div 
        className="relative w-full md:w-3/5 min-h-[300px] md:h-full flex flex-col justify-center items-center px-10 text-center bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(135deg, rgba(26, 41, 128, 0.85) 0%, rgba(38, 208, 206, 0.4) 100%), url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop')` 
        }}
      >
        <div className="max-w-xl space-y-3">
          {/* Headline - Slidly downsized to text-7xl for neat viewport fitting */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight drop-shadow-2xl">
            Dummy Auth
          </h1>
          {/* Tagline - Toned down slightly */}
          <p className="text-white/90 text-base md:text-xl font-medium tracking-wide">
            Secure Login with Context API & DummyJSON
          </p>
        </div>
      </div>

      {/* Right Form Side - 40% Width, No scroll on standard viewports */}
      <div className="w-full md:w-2/5 md:h-full flex items-center justify-center p-6 sm:p-12 lg:p-14 bg-[#0F1014] border-t md:border-t-0 md:border-l border-slate-900/60 overflow-y-auto">
        {/* Adjusted spacing from space-y-12 to space-y-8 */}
        <div className="w-full max-w-md space-y-8 my-auto">
          
          {/* Header Texts - Balanced Font Sizes */}
          <div className="space-y-1.5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Welcome Back...
            </h2>
            <p className="text-[#8E9096] text-base sm:text-lg font-medium">
              Sign in to continue
            </p>
          </div>

          {/* Form Fields - Compact spacing & padding */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username Input */}
            <div className="space-y-2">
              <label className="block text-base font-bold text-[#D1D4DC] tracking-wide">
                Username
              </label>
              <input
                type="text"
                required
                placeholder="Enter username"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl bg-[#292A2E]/60 border border-[#3A3B40]/50 text-slate-100 placeholder-[#5F6168] text-base focus:outline-none focus:border-indigo-500 focus:bg-[#292A2E]/80 transition-all duration-200"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-base font-bold text-[#D1D4DC] tracking-wide">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl bg-[#292A2E]/60 border border-[#3A3B40]/50 text-slate-100 placeholder-[#5F6168] text-base focus:outline-none focus:border-indigo-500 focus:bg-[#292A2E]/80 transition-all duration-200"
              />
            </div>

            {error && (
              <p className="text-sm font-bold text-rose-400 bg-rose-500/10 py-3 px-4 rounded-xl border border-rose-500/20">
                {error}
              </p>
            )}

            {/* Login Button - Adjusted text sizing */}
            <button
              type="submit"
              className="w-full py-4 px-5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-black text-lg tracking-wide transition-all duration-200 active:scale-[0.97] shadow-xl shadow-indigo-950/50"
            >
              Login
            </button>
          </form>

          {/* Demo Account Box - Compact padding and fonts */}
          <div className="p-5 rounded-2xl bg-[#131419] border-l-4 border-blue-600 space-y-3 shadow-xl">
            <h4 className="text-xs font-black text-[#3B82F6] tracking-widest uppercase">
              Demo Account
            </h4>
            <div className="space-y-2 text-sm sm:text-base">
              <p className="text-slate-400 font-medium">
                Username: <span className="text-white font-mono font-bold bg-[#202127] px-2 py-0.5 rounded text-sm ml-2">emilys</span>
              </p>
              <p className="text-slate-400 font-medium">
                Password: <span className="text-white font-mono font-bold bg-[#202127] px-2 py-0.5 rounded text-sm ml-2">emilyspass</span>
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}