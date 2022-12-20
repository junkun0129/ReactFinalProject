import ReactDOM from "react-dom";
import React from "react";
import styles from "./map.module.scss"
import { dataEvent, dataNaibors } from "../datas/data";
import OneMenu from "../components/OneMenu";
import ChatBox from "../ChatBox/ChatBox";
import Book from "../Book/Book";
import { currentReducer } from "../Reducuer/currentReducer";
import {Routes, Route, Link} from "react-router-dom"
import {supabase} from "../datas/supabaseCliant";



import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker
} from "@react-google-maps/api";
import { useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";


import usePlacesAutocomplete,{
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useEffect } from "react";
import { useReducer } from "react";
import { useSelector } from "react-redux";



const lib = ["places"];
const id = ["1895ee56eb48f41"]
const key = "AIzaSyCLMvo_s8JFciYhn2XIBjYADYPn6Vzk_Yw"; // PUT GMAP API KEY HERE
const defaultLocation = { lat: 34.461936, lng: -227.498525 };


export default function Map ({User}){

 
  const[current, dispatchCuurent] = useReducer(currentReducer, {
    data:[],
    isEvent:false,
    isNabor:false
  })

  const userInfo = useSelector(state=>state.user[0])
  const[selected, setSelected] = useState(null);

  // useEffect(()=>{
  //   setSelected(null)
  // },[current.isEvent])
  useEffect(()=>{
    console.log(userInfo,"desuke")

  },[])

  
 

  const showCurrentEvent = useCallback((e)=>{
    setSelected(null)
    dispatchCuurent({type:"event", payload:dataEvent });
    console.log(User);
  },[]);

  const showCurrentNabors = useCallback((e)=>{
    setSelected(null)
    dispatchCuurent({type:"naibor", payload:dataNaibors})
   
  },[])

 

  const MapRef = useRef();
  const onMapLoad = useCallback((map)=>{
    MapRef.current = map;
  })
  
    return (
      <div className={styles.iwatani}>
       <LoadScript googleMapsApiKey={key} libraries={lib} mapIds={id} className = {styles.jum}>
        <GoogleMap
          center={defaultLocation}
          zoom={17}
          options={{ mapId: id, disableDefaultUI:true}}
          mapContainerStyle={{ 
            width: "100vw", 
            height: "100vh",
            
           
          }}
          onLoad = {onMapLoad}
          
        >
         
          {current.data.map(mark => <Marker 
            key = {mark.id} 
            position = {{lat:mark.lat, lng:mark.lng}}
            icon = {{
              url: mark.picture,
              scaledSize: new window.google.maps.Size(40,40),
              fillColor: "#22335d"
            }}
            onClick = {()=>{
              setSelected(mark);
            }}
            

            
          />)}


          {selected ? (<InfoWindow 
                  position={{lat: selected.lat+0.0001, lng:selected.lng}} 
                  onCloseClick = {()=>{setSelected(null);}}
                  
                  >
            <>
            
            {current.isEvent?(
              <div>
              <h2>{selected.title}</h2>
              <h3>{selected.date}</h3>
              <h4>{selected.discription} </h4>
              <br/>
              <ul>
                {selected.participants.map((person,i)=>{
                  return(<li key={i}>・{person}</li>)
                })}
              </ul>
              <button>book</button>
              <button>info board</button>

            </div>):null}

            {current.isNabor?(
              <div className={styles.nabor}>
                <h1 className={styles.naborName}>{selected.name}</h1>
                <button className={styles.naborButton}>profile</button>
                <dev className={styles.chat}>

                  <ChatBox/>
                </dev>
                
              </div>
            ):null}
            </>
            
          </InfoWindow>):null}
        </GoogleMap>
        </LoadScript>

        <dev className = {styles.title}>
         <dev className = {styles.titleName}>Catching-App</dev>
         <dev className = {styles.titleBorder}></dev>
         <dev className = {styles.userName}>Hi   {User.nickName}</dev>
           
          <dev className = {styles.menu}>
            <OneMenu onClick = {showCurrentEvent} title = {"All"}></OneMenu>
            <OneMenu onClick = {showCurrentNabors} title = {"Neibors"}></OneMenu>
            <OneMenu onClick = {showCurrentEvent} title = {"Event"}></OneMenu>
            <OneMenu onClick = {showCurrentEvent} title = {"Options"}></OneMenu>
            
          </dev>
        </dev>

       
        
        
      </div>
    );
  
}