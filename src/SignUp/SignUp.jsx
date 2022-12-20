import ReactDOM from "react-dom";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import {supabase} from "../datas/supabaseCliant";
import styles from "./SignUp.module.scss";
import {motion} from "framer-motion";


export default function SignUp(){

    const[email, setEmail] = useState(null);
    const[password, setPassword] = useState(null);
    const [idFromSession, setIdFromSession] = useState(null);
    const [emailFromSession, setEmailFromSession] = useState(null);
    const [isregister, setIsregister] = useState(false);
    
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state);


    useEffect(()=>{
       setIsregister(false);
    },[])

    useEffect(()=>{
        createNewUser();
    },[isregister])

   

    const createNewUser= async()=>{
        const { error } = await supabase
        .from('userInfomation-catchingApp')
        .insert({ id: idFromSession, email: emailFromSession, username:null })
    }

    const registerUser =async(e)=>{
        
      
            
        if(email&&password){
            
          
            try {
                
                const { data, error } = await supabase.auth.signUp({
                email,
                password
                })
                
                // console.log(data.user.email);
                if(data){

                    
                    setIdFromSession(data.user.id)
                    setEmailFromSession(data.user.email)
                    setIsregister(true);
                }
                
                console.log("registered")
            } catch (e) {
                console.log(e)
            }
                    
        
    }
        
    
    }
    
    
    
    return(
        <> 
        <div className={styles.bigBox}>
            <motion.div animate = {isregister?{x:1000}:{x:0}}className={styles.loginpage}>

                <h1 className={styles.title}>Sign UP Page</h1>
                
                <input type="text" placeholder="type your email" onChange={(e)=>setEmail(e.target.value)}/><br/>
                <input type="text" placeholder = "type your password" onChange={(e)=>setPassword(e.target.value)}/><br/>
                <button onClick={(e)=>registerUser(e)}>register</button>

                
            </motion.div>

            <motion.div animate = {isregister?{x:0}:{x:-1000}}className={styles.loginpage2}>
                <h1>valification has been sent to your email</h1>
            </motion.div>
        </div> 
        
        
            {/* <motion.button className={styles.createUser} animate={isregister?{opacity:1}:{opacity:0}}onClick={()=>createNewUser()}>user created! go to login Page</motion.button> */}
       
        </>
    )
}