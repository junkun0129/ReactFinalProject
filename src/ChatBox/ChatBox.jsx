import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import { useState } from "react";
import styles from "./ChatBox.module.scss";

firebase.initializeApp({
    apiKey: "AIzaSyDJLnwPGEAnhvUm3iOHRmtSifOJ_yI86lI",
    authDomain: "jumnepi.firebaseapp.com",
    projectId: "jumnepi",
    storageBucket: "jumnepi.appspot.com",
    messagingSenderId: "500456445605",
    appId: "1:500456445605:web:96abfd5422dfe1c33b1f4c",
    measurementId: "G-S33DS8658H"
})

const auth = firebase.auth();
const firestore = firebase.firestore()

export default function ChatBox(){
    return(
        <>
         <section className={styles.chatRoom}>
            <ChatRoom></ChatRoom>
         </section>
        </>
    )
}

function ChatRoom(){
    const [formValue, setFormValue] = useState("");
    
    const [currentUser, setCurrentUser] = useState("jum");
    const [currentCaller, setCurrentColler] = useState("an");

    //const [currentCallBox, setCurrentCallBox] = useState(currentUser+currentCaller)

    const messagesRef = firestore.collection(currentCaller);
    
    const query = messagesRef.orderBy("createdAt").limit(25);
    const [messages] = useCollectionData(query, {idField:"id"});
    const sendMessage = async(e)=>{
        e.preventDefault();

        await messagesRef.add({
            text: formValue,
            uid: currentUser,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })

        setFormValue("");
    }
    return(
        <>
            <div className={styles.messageBox}>
                {messages && messages.map(msg=><ChatMessage key={msg.id} message = {msg} User = {currentUser} Caller = {currentCaller}/>)}
            </div>

            <form onSubmit={sendMessage} className={styles.submitBox}>
                <input className={styles.submitmessageBox} value = {formValue} onChange = {(e) =>setFormValue(e.target.value)}/>
                <button className={styles.submitButton} type = "submit">あ</button>
            </form>
        </>
    )
}

function ChatMessage(props){
    const {text, uid} = props.message;
    const {User, Caller} = props
    

    return (
        <div className={User === uid ? styles.sent : styles.received}>
            {User === uid ? (<p>{text}</p>): uid === Caller ? (<p>{text}</p>) : null}
             
        </div>
    )
}