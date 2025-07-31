import { useState,useEffect, lazy, Suspense } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
// import head from './components/head'
import { Routes, Route } from 'react-router-dom';
import Head from './components/Head';
import Body from './components/Body';
import ResturantMenu from './components/ResturantMenu'
import { CardContext, Visibilty } from './context/contextApi'
import { Coordinates } from './context/contextApi'
import Cart from './components/Cart'
import SignUp from './components/SignUp'

// import Search from './components/Search'

const Search = lazy(()=> import ("./components/Search"))


function App() {
  const [visible ,setvisible] = useState (false)
  const [coord,setcoord] = useState({lat:28.65200,lng:77.16630})
  const [cartdata,setcartdata] = useState([])

  function get_data_from_local_storage() {
       let data = JSON.parse(localStorage.getItem("cartdata")) ||[]
       setcartdata(data);
    }
    useEffect(()=>{
          get_data_from_local_storage()
        },[])
  return (
    <CardContext.Provider value={{cartdata,setcartdata}}>
    <Coordinates.Provider value ={{coord,setcoord}}>
    <Visibilty.Provider value={{visible,setvisible}}>
    <div className={visible?"max-h-screen overflow-hidden"  :""}>
      <Routes> 
       
      <Route path="/" element={<Head />}>
      <Route path="/" element={<Body/>} />
      <Route path="/signin" element={<SignUp/>} />
      <Route path="/Res/:id" element={<ResturantMenu/>} />
      <Route path="/search" element={<Suspense>
        <Search/>
      </Suspense>} />
      <Route path="/Cart" element={<Cart/>} />
      </Route>
    </Routes>
    </div>
    </Visibilty.Provider>
    </Coordinates.Provider>
    </CardContext.Provider>
  );
}
export default App;

