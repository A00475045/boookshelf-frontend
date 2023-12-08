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
import {RequireAuth} from 'react-auth-kit'

function App() {

  return (
    <div>
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
    </div>
  );
}

export default App;
