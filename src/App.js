import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Home from './components/Home'
import Layout from './components/Layout'
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

         <Route index element={<Home />} />
        {/*<Route path="mycity" element={<MyCity />} />*/}
        {/* <Route path="*" element={<NotFound />} />  */}


        </Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
