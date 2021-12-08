import React from 'react';
import {Routes,Route} from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import Home from '../src/Pages/Home/Home'
import ProductDetail from '../src/Pages/Product/ProductDetail'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {


  
  return (
    <>
      <Routes>
        <Route exact path = '/' element={<Home new_params={"testing"}/>}/>
        <Route exact path = '/ProductDetail' element={<ProductDetail new_params={"testing"}/>}/>
      </Routes>
    </>
  );
}

export default App;
