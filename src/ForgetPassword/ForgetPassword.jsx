import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {supabase} from "../datas/supabaseCliant";
import styles from "./ForgetPassword.module.scss"

export default function ForgetPassword(){

    const [email, setEmail] = useState(null);

    const submitRequest=(e)=>{
        e.preventDefault();
        if(email){
           sendingResetRequest();
        }
    }

    const sendingResetRequest=async()=>{
      

      try {
        
        const { data, error } = await supabase.auth
        .resetPasswordForEmail(email)

        if(data){
          console.log("email has been sent")
        }
      } catch (error) {
        
      }
      

    }

    


    return(
        
        <div className={styles.forgetpage}>

            <h1 className={styles.title}>password reset</h1>
            <form action="submit" onClick={(e) =>submitRequest(e)}>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder = "type your email"/>
                <button>send comfirmation mail</button>
            </form>
        </div>
        
    )
}