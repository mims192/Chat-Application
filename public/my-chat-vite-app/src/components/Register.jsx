import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify'
import axios from 'axios'
import { useAuth } from './Context/Authcontext';

function Register() {
    const navigate = useNavigate()
    const {setAuthUser}=useAuth();
    const [loading , setLoading] = useState(false);
    const [inputData , setInputData] = useState({})
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true)
        if(inputData.password !== inputData.confpassword.toLowerCase()){
            setLoading(false)
            return toast.error("Password Dosen't match")
        }
        try{
            const register = await axios.post(`/api/auth/register`,inputData);
            const data = register.data;
            if(data.success === false){
                setLoading(false)
                toast.error(data.message)
                console.log(data.message);
            }
            toast.success(data?.message)
            localStorage.setItem('chaton',JSON.stringify(data))
            setAuthUser(data)
            setLoading(false)
            navigate('/login')
        }catch (error) {
            setLoading(false)
            console.log(error);
            toast.error(error?.response?.data?.message)
        }
        
    }
    const handleInput=(e)=>{
        setInputData({
            ...inputData , [e.target.id]:e.target.value
        })
    }
    const selectGender=(selectGender)=>{
        setInputData((prev)=>({
            ...prev , gender:selectGender === inputData.gender ? '' : selectGender
        }))
    }
  
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
          <div className="flex flex-col items-center justify-center bg-green-200 p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">Sign up!</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
            <input
                id='fullname'
                type="text"
                placeholder="Fullname"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInput}
                required
              />
            <input
                id='username'
                type="text"
                placeholder="Username"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInput}
                required
              />
              <input
                id='email'
                type="email"
                placeholder="Email"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInput}
                required
              />
              <input
                id='password'
                type="password"
                placeholder="Password"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInput}
                required
              />
              <input
                id='confpassword'
                type="password"
                placeholder="Confirm Password"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInput}
                required
              />
              <div id='gender' className="flex gap-2">
                <label className="cursor-pointer label flex gap-2">
                <span className="label-text font-semibold text-gray-950">male</span>
             <input  
                onChange={()=>selectGender('male')}
                checked={inputData.gender === 'male'}
                type='checkbox' 
                className="checkbox checkbox-info"/>
                </label>
                <label className="cursor-pointer label flex gap-2">
                <span className="label-text font-semibold text-gray-950">female</span>
                <input 
                checked={inputData.gender === 'female'}
                onChange={()=>selectGender('female')}
                type='checkbox' 
                className="checkbox checkbox-info"/>
                </label>
                </div>
              
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                {loading ? "loading..":"Register"}

              </button>
              
            </form>
           <div className='pt-2'>
           <span>Already have account?<Link to='{/login}' className='font-semibold hover:text-blue-400 underine cursor-pointer'>LOGIN</Link></span>
           </div>
          </div>
        </div>
      );
    }
    
    
  

export default Register
