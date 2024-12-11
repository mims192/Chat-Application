import { useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logiin from './components/Logiin'
import Register from './components/Register';
import Home from './components/Home';
import { VerifyUser } from './utils/VerifyUser';


function App() {
 

  return (
   <>
   <Routes>
   
    <Route path='/login' element={<Logiin/>}/>
    <Route path='/' element={<Register/>}/>
    <Route element={<VerifyUser/>}>
    <Route path='/user' element={<Home/>}/>
    </Route>
   </Routes>
   
   <ToastContainer/>
   </>
  )
}

export default App
