import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Contactus from "./components/Contactus";
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
// import Contactus from './components/Contactus'
import Layout from './components/Layout'
import NotFound from './components/NotFound'
import Dashboard from './components/Dashboard'
import cookie from 'js-cookie';
import LoginContext from './components/LoginContext';
import { useState } from "react";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(cookie.get('jwt') !== undefined)
  return (
    <div>
    <LoginContext.Provider value={{isUserLoggedIn,setIsUserLoggedIn}}>

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="contactus" element={<Contactus />} />
          <Route path="dashboard" element={<Dashboard />} />


          <Route path="*" element={<NotFound />} /> 
        </Route>

      </Routes>
      </BrowserRouter>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
