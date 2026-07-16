  import './App.css';
  import { Navigate, Route, Routes } from 'react-router';
  import Home from './Pages/Home';
  import Login from './Pages/Login';
  import axios from 'axios';
  import { useCallback, useContext, useEffect } from 'react';
  import { GlobalContext } from './context/Context';

  function App() {

      const [user, dispatch] = useContext(GlobalContext)

    const checkUser=useCallback(async()=>{
      const userToken = localStorage.getItem('Token')
    if(userToken){
      try {
          const apiRes = await axios.get('https://dummyjson.com/auth/me', { headers: { 'Authorization': `Bearer ${userToken}` } });
          dispatch({ type: "USER_LOGIN", user: { ...apiRes.data, accessToken: userToken } })
        } catch (error) {
          localStorage.removeItem("Token");
          dispatch({ type: "USER_LOGOUT" })
          console.log("Err", error)
        }
    }else{
      localStorage.removeItem("Token");
          dispatch({ type: "USER_LOGOUT" })
    }
    }, [dispatch])

    useEffect(()=>{
      checkUser()
    },[checkUser])

    return (
      /* Flex and center content globally, with your exact gradient background */
      <div className="min-h-screen bg-gradient-to-br from-[#0c0d14] via-[#1b082e] to-[#0c0d14] flex flex-col justify-center items-center font-sans antialiased">
        {
        user.isLogin === null ?
          <h1 className='text-7xl text-slate-200 font-extrabold'>Loading...</h1>
          :
          user.isLogin ?
            <div className="userApp w-full">
              <div className="mainPage">
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
              </div>
            </div>
            :
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
      }

      </div>
    );
  }

  export default App;