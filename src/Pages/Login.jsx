import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { GlobalContext } from '../context/Context';

export default function Login() {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [user, dispatch] = useContext(GlobalContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(passwordInput);
    
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
    <div className="w-full max-w-xl bg-[#12131C] p-10 rounded-[2.5rem] border border-slate-800/80 shadow-2xl transition-all">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Login
        </h1>
        <p className="text-slate-400 text-sm mt-2.5">
          Enter details to log in
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          {/* Email input ko fully Username field me badal diya */}
          <input
            type="text"
            required
            placeholder="Username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-100 placeholder-slate-500 text-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div>
          <input
            type="password"
            required
            placeholder="Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-100 placeholder-slate-500 text-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {error && (
          <p className="text-sm text-rose-400 bg-rose-500/10 py-3 px-4 rounded-xl border border-rose-500/20">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-lg transition-all active:scale-95 shadow-lg shadow-blue-500/20"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}