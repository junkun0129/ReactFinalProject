import ReactDOM from "react-dom";
import React from "react";
import styles from "./OneMenu.module.scss"

export default function OneMenu({onClick,title}){
    return(
        <>
            <button onClick = {onClick} className={styles.oneMenu}>{title}</button>
        </>
    )
}