import React,{useState,useEffect} from 'react';
import {Routes,Route} from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import Home from '../src/Pages/Home/Home'
import ProductDetail from '../src/Pages/Product/ProductDetail'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {FullPageLoading} from './Component/Loading/Loading'
import {GetAllProduct,getAllSubCategory} from './redux/Actions/ProductActions'
import {useDispatch,useSelector} from 'react-redux'
function App(props) {
  const Auth=useSelector(state=>state.Auth)
  const Product = useSelector(state=>state.Product)
  
  const dispatch=useDispatch()

  const [loading,setLoading]=useState(true)


  useEffect(()=>{
    var all_product = JSON.parse(localStorage.getItem('all_product'))
    var all_category = JSON.parse(localStorage.getItem('all_category'))
    var all_subcategory = JSON.parse(localStorage.getItem('all_subcategory'))
    var all_array_groupbuy = []
    var all_array_new = []
    
    if(  
      (all_product === null || all_product === '') && 
      (all_category === null || all_category === '') &&
      (all_subcategory === null || all_subcategory === ''))
    {
        dispatch(GetAllProduct()) // get all product,category,subcategory,category groupbuy, category  new
        console.log(Auth)
        setLoading(false)
    }else {
      dispatch({type:'GETALLPRODUCT',allProduct:all_product}) // saving all product to getallProduct
      dispatch({type:'LOADING'})
      console.log(Auth)
      all_product.forEach((val,index,array)=>{
          if(val.GroupBuy_Purchase === true || val.GroupBuy_Purchase === 'true'){
            all_array_groupbuy.push(val)
          }
          if (val.Categorize_NEW === true || val.Categorize_NEW === 'true') {
              all_array_new.push(val)
          }
          if(index === array.length - 1){

              dispatch({type:'GETALLCATEGORYGROUPBUY',allCategoryGroupBuy:all_array_groupbuy}) // saving all product to category groupbuy
              dispatch({type:'GETALLCATEGORYNEW',allCategoryNew:all_array_new}) // saving all product to category new
          }
      })
      dispatch({type:'GETALLCATEGORY',allCategory:all_category}) // saving all data to allcategory
      dispatch(getAllSubCategory(all_category)) // get all subcategory , saving to getallsubcategory
      setLoading(false)
    }

  },)

  if(loading){
    return (
      <div className='d-flex justify-content-center align-items-center' style={{height:"100vh", width:"100vw"}}>
          {FullPageLoading(loading,100,'#0095DA')}
      </div>
    )
  }
  
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
