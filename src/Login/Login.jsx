import ReactDOM from "react-dom";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import {supabase} from "../datas/supabaseCliant";
import { faJugDetergent } from "@fortawesome/free-solid-svg-icons";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import {Routes, Route, Link} from "react-router-dom"
import { useDispatch,useSelector } from "react-redux";
import styles from "./Login.module.scss"
import {motion} from "framer-motion";



export default function Login(){
   
    const [users, setUsers] = useState(null);
    const [email, setEmail] = useState(null);
    const [idFromSession, setidFromSession] = useState(null);
    const [password, setPassword] = useState(null);
    const [opacity, setOpacity] = useState(0);
    const [Elength, setElength] = useState(0);
    const [Plength, setPlength] = useState(0);

    const dispatch = useDispatch();
    const userInfo = useSelector(state=>state);

    //question
    // why it is submitted even when I click input space
    
    useEffect(()=>{
        // fetchUserInfo();
        
        console.log(idFromSession)
        userDataFetch();
        
    },[idFromSession])

    useEffect(()=>{
        const totalLength = Plength+Elength
        setOpacity(totalLength*0.015)
    }, [Elength])
    useEffect(()=>{
        const totalLength = Plength+Elength
        setOpacity(totalLength*0.015)
    }, [Plength])

    useEffect(() => {

        supabase.auth.onAuthStateChange(async (event, session) => {
          if (event == "PASSWORD_RECOVERY") {
            const newPassword = prompt("What would you like your new password to be?");
            const { data, error } = await supabase.auth
              .updateUser({ password: newPassword })
     
            if (data) alert("Password updated successfully!")
            if (error) alert("There was an error updating your password.")
          }
          console.log(event, "this is event")
          console.log(session, "this is session")
          if(!event){
            console.log("there is no session")
          }
        })

      }, [])

    // const datafetch = async()=>{
    //     const { data, error } = await supabase
    //     .from('userInfomation-catchingApp')
    //     .select("*")

    //     console.log(data)
    // }

    const userDataFetch=async()=>{
        const { data, error } = await supabase
        .from('userInfomation-catchingApp')
        .select("*")
        .eq("id", idFromSession)

        console.log(data, "row matched")
        dispatch({type:"LOGIN_USER", payload:data[0]});
        // const sameuser = data.filter(one => one.id === idFromSession)
        console.log(userInfo, "userIndo")
        // console.log("this is same user",sameuser)
    }

    
    
    
    
    // const Login=(e)=>{
    //     e.preventDefault();
    //     if(email&&password){

    //         preLogin();

    //     }
    // }

    const preLogin=async()=>{
        
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          })

        if(data){

            
            setidFromSession(data.user.id);
            window.open("http://localhost:5173/map")
        }
        
        console.log(data)

        
    
    }

    const emailOnChange=(e)=>{
        setEmail(e.target.value);
        
        setElength(e.target.value.length);
    }
    const passwordOnChange=(e)=>{
        setPassword(e.target.value);
        // setOpacity(opacity+e.target.value.length*0.1)
        setPlength(e.target.value.length);
    }

    return(
        <>  

        <motion.div className={styles.map} animate = {{opacity:opacity}}></motion.div>
        <div className={styles.loginpage}>

            <h1 className={styles.title}>Login Page</h1>
          
           <input type="email" onChange={(e)=>emailOnChange(e)} placeholder = "email"/>
           <input type="password" onChange={(e)=>passwordOnChange(e)} placeholder = "password"/>
           <button onClick={()=>preLogin()}>login</button>
           <Link to = "/forget" className={styles.forget}>Forget Password</Link>
           {/* <button onClick={()=>userDataFetch()}>data go to store</button> */}
        </div>
          
            
            
        </>
    )
}