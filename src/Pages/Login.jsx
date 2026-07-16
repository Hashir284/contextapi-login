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
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#0A0B0D]">
      
      {/* Left Banner Side - 60% Width on Desktop */}
      <div 
        className="relative w-full md:w-3/5 min-h-[350px] md:min-h-screen flex flex-col justify-center items-center px-10 text-center bg-cover bg-center transition-all"
        style={{ 
          backgroundImage: `linear-gradient(135deg, rgba(26, 41, 128, 0.85) 0%, rgba(38, 208, 206, 0.4) 100%), url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop')` 
        }}
      >
        <div className="max-w-2xl space-y-4">
          {/* Headline - Scaled up to 9xl on desktop */}
          <h1 className="text-6xl mb-8 md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight drop-shadow-2xl">
            Dummy Auth
          </h1>
          {/* Tagline - Scaled up to 3xl */}
          <p className="text-white text-lg md:text-2xl lg:text-3xl font-normal tracking-wide">
            Secure Login with Context API & DummyJSON
          </p>
        </div>
      </div>

      {/* Right Form Side - 40% Width on Desktop */}
      <div className="w-full md:w-2/5 flex items-center justify-center p-7 sm:p-16 md:p-16 lg:p-20 bg-[#0F1014] border-t md:border-t-0 md:border-l border-slate-900 transition-all">
        <div className="w-full max-w-xl space-y-12">
          
          {/* Header Texts - Scaled up sizes */}
          <div className="space-y-3">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Welcome Back...
            </h2>
            <p className="text-[#8E9096] text-lg sm:text-xl lg:text-2xl font-semibold">
              Sign in to continue
            </p>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleLogin} className="space-y-8">
            {/* Username Input */}
            <div className="space-y-4">
              <label className="block text-lg sm:text-xl font-extrabold text-[#D1D4DC] tracking-wide">
                Username
              </label>
              <input
                type="text"
                required
                placeholder="Enter username"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full px-6 py-5 rounded-2xl bg-[#292A2E]/60 border border-[#3A3B40]/50 text-slate-100 placeholder-[#5F6168] text-lg sm:text-xl focus:outline-none focus:border-indigo-500 focus:bg-[#292A2E]/80 transition-all duration-200"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-4">
              <label className="block text-lg sm:text-xl font-extrabold text-[#D1D4DC] tracking-wide">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-6 py-5 rounded-2xl bg-[#292A2E]/60 border border-[#3A3B40]/50 text-slate-100 placeholder-[#5F6168] text-lg sm:text-xl focus:outline-none focus:border-indigo-500 focus:bg-[#292A2E]/80 transition-all duration-200"
              />
            </div>

            {error && (
              <p className="text-base sm:text-lg font-bold text-rose-400 bg-rose-500/10 py-4 px-5 rounded-2xl border border-rose-500/20">
                {error}
              </p>
            )}

            {/* Login Button - Bigger & Bold */}
            <button
              type="submit"
              className="w-full py-5 px-6 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-black text-xl sm:text-2xl tracking-wide transition-all duration-200 active:scale-[0.97] shadow-2xl shadow-indigo-950/50"
            >
              Login
            </button>
          </form>

          {/* Demo Account Box */}
          <div className="p-7 rounded-3xl bg-[#131419] border-l-8 border-blue-600 space-y-5 shadow-2xl">
            <h4 className="text-sm sm:text-base lg:text-lg font-black text-[#3B82F6] tracking-widest uppercase">
              Demo Account
            </h4>
            <div className="space-y-3 text-base sm:text-lg lg:text-xl">
              <p className="text-slate-400 font-semibold">
                Username: <span className="text-white font-mono font-black bg-[#202127] px-3 py-1 rounded-lg text-base ml-2">emilys</span>
              </p>
              <p className="text-slate-400 font-semibold">
                Password: <span className="text-white font-mono font-black bg-[#202127] px-3 py-1 rounded-lg text-base ml-2">emilyspass</span>
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}