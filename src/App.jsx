import { useState } from 'react'
import styles from './App.module.scss'
import Map from "./Map/map";
import {Routes, Route, Link} from "react-router-dom"
import Login from './Login/Login';
import Book from './Book/Book';
import SignUp from './SignUp/SignUp';
import ForgetPassword from './ForgetPassword/ForgetPassword';
import Logout from './Logout/Logout';

function App() {

  const [User, setUser] = useState({
    userid: 0,
    firstName: "jumpei",
    secondName: "iwatani",
    Email: "onoyouko@icoud.com",
    password: "onoyouko09!",
    nickName: "jumanji"
  });
  
  
  return (
      <>
      

      <Routes>
        <Route path="/" element = {<Login></Login>}/>
        <Route path="/logout" element = {<Logout></Logout>}/>
        <Route path="/signup" element = {<SignUp></SignUp>}/>
        <Route path="/map" element = {<Map User = {User}></Map>}>
          <Route path="new" element = {<Book/>} />
        </Route>
        <Route path = "/forget" element = {<ForgetPassword></ForgetPassword>}/>
        
        
      </Routes>

      {/* <Link to = "/">Forget Password</Link><br></br>
      <Link to = "/login">login</Link><br></br>
      {User?(<Link to = "/map">lets go to map</Link>):null} */}
     
      
      </>
    
  )
}

const Iwatani = ()=><h1>iwatani</h1>
export default App
