import React from "react";
import {Outlet , Navigate} from 'react-router-dom'
import { useAuth } from "../components/Context/Authcontext";


export const VerifyUser = ()=>{
    const {authUser} = useAuth();
    return authUser ? <Outlet/> : <Navigate to={'/login'}/>
}