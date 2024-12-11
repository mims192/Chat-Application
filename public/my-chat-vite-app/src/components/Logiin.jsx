import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useAuth } from './Context/Authcontext'

function Logiin() {
  const navigate=useNavigate()
  const {setAuthUser}=useAuth()
  const [userInput,setuserInput]=useState({});
  const [loading,setloading]=useState(false);

  const handleSubmit=async(e)=>{
    e.preventDefault()
    setloading(true)
      try{
        const login=await axios.post('api/auth/login',userInput);
        const data=login.data  //backend data
        if(data.success===false){
          setloading(false)
          console.log(data.message)
        }
      toast.success(data.message)   //on login jo msg send kr rhe the backend mai
      localStorage.setItem('chaton',JSON.stringify(data))    // in data we are getting all info id,fullname... from backend
      setAuthUser(data)
      setloading(false)
      navigate('/user')
      console.log(data.message)
      }
      catch(error){
        setloading(false)
        console.log(error);
        toast.error(error?.response?.data?.message)
      }
  }    
  const handleInput=(e)=>{
     setuserInput({
      ...userInput,[e.target.id]:e.target.value
     })
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-green-100'>
       <div className="flex flex-col items-center justify-center bg-green-200 p-8 rounded-lg shadow-lg">
       <h1 className="text-3xl font-bold text-gray-800 mb-4">LOGIN</h1>
       <form onSubmit={handleSubmit}  className="flex flex-col gap-4 w-full max-w-sm">
          <input
            id='email'
            onChange={handleInput}
            type="email"
            placeholder="Email"
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            id='password'
            onChange={handleInput}
            type="password"
            placeholder="Password"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            
          >
            {loading?"loading..":"Login"}
            
          </button>
        </form>
        <div className='pt-2 '>
        <span className='font-semibold' >Don't have an account?<Link to='{/signup}' className=' hover:text-blue-400 underine cursor-pointer'>Register</Link></span>
        </div>
        
        </div>
      
    </div>
  )
}

export default Logiin
