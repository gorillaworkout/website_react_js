import React,{useEffect,useState} from 'react';
import {Routes,Route} from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import Home from '../src/Pages/Home/Home'

function App() {


  
  return (
    <>
      <Routes>
        <Route exact path = '/' element={<Home new_params={"testing"}/>}/>
      </Routes>
    </>
  );
}

export default App;
