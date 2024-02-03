import React from "react";
import './App.css';
import Home from './components/home/home.js';
import Login from "./components/login/login.js"
import Navbarr from './components/navbar/navbar.js';
import Signup from "./components/signup/signup.js"
import Details from "./components/details/index.js"
import Sale from './components/sale/sale.js';
import MyProfile from "./components/myprofile/myProfile.js";
import {
  BrowserRouter,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";

function App() {
  return (
   <>
        <BrowserRouter future={{ v7_startTransition: true }}>
          <Navbarr/>
        <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path="/home" element= { <Home/> }  />
        <Route path='/signup' element={<Signup/>}>
        </Route>
        <Route path='details/:id' element={<Details/>}></Route>
        <Route path='/sale' element={<Sale/>}></Route>
        <Route path='/myprofile' element={<MyProfile/>}></Route>

      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
