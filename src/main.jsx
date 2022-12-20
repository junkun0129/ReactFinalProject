import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import { currentReducer } from './Reducuer/currentReducer';
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import storage from "reduxjs-toolkit-persist/lib/storage";
import { persistStore, persistReducer } from "reduxjs-toolkit-persist";
//import {getDefaultMiddleware} from "@reduxjs/toolkit";

//import { combineReducers } from '@reduxjs/toolkit';

const reducer1 = (state = {user:[]}, action)=>{
  switch(action.type){
    case "LOGIN_USER":
      return {
        user:[
          action.payload,
          
        ]
      }
    case "LOGOUT_USER":
      return {user:[]}

  }

  return state;
}
// const reducer2 = (state = null, action)=>{
//   switch(action.type){
//     case "SAIKOU_USER":
//       return action.payload.user
//     case "SAIKYOU_USER":
//       return {}
//   }
// }




//persist 
const persistConfig = {
  key: "root",
  storage
};


//const rootReducer = combineReducers({userLog:reducer1, userBog:reducer2})
const persistedReducer = persistReducer(persistConfig, reducer1)



const store = configureStore({
  reducer:persistedReducer,
  middleware:getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  })
})
let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(

    <Provider store = {store}>
      <BrowserRouter>
      <PersistGate loading = {null} persistor={persistor}>
        <App />
      </PersistGate>
      </BrowserRouter>
    </Provider>

)
