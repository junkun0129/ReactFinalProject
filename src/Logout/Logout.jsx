import {supabase} from "../datas/supabaseCliant";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Logout(){


    const dispatch = useDispatch();
    const comfirmation = useSelector(state=>state)

    const logout=()=>{

        preLogout();

        //delete info from store of redux
        // dispatch({type:"LOGOUT_USER"})
    }

    const preLogout = async()=>{
        const { error } = await supabase.auth.signOut()
        dispatch({type:"LOGOUT_USER"})
        console.log(error)
    }
    
    return(
        <>
            <h1>Log Out </h1>
            <button onClick={()=>logout()}>Log out</button>
            <button onClick={()=>console.log(comfirmation)}>confirm if we have values in store</button>
        </>
    )
}