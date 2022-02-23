import React,{useState,useEffect} from 'react';
import {Routes,Route} from 'react-router-dom'

// import logo from './logo.svg';
import './App.css';
import Home from '../src/Pages/Home/Home'
import ProductDetail from '../src/Pages/Product/ProductDetail'
import BuyNow from '../src/Pages/BuyNow/BuyNow.jsx'
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register.jsx'
import ProductPage from './Pages/Subcategory/Subcategory';
import PigeonMap from '../src/Pages/MapsTesting/PigeonMap.jsx'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {FullPageLoading} from './Component/Loading/Loading'
import {GetAllProduct} from './redux/Actions/ProductActions'
import {getAllOrderListRedux} from './redux/Actions/OrderActions'
import {useDispatch,useSelector} from 'react-redux'
import {LoginRedux} from './redux/Actions/AuthActions'
import Cart from './Pages/Cart/Cart';
import Category from './Pages/Category/Category';
import Testing from './Pages/Product/testing'
import { useNavigate } from 'react-router-dom';



function App(props) {
  const navigate = useNavigate()
  const Auth=useSelector((state)=>state.Auth)
  const Product = useSelector((state)=>state.Product)
  
  const dispatch=useDispatch()

  const [loading,setLoading]=useState(Product.isLoadingProduct)
  const [ProductFromReducers,setProductFromReducers]=useState(Product)

  useEffect(()=>{
    var token = JSON.parse(localStorage.getItem('token'))
    if(token) {
      console.log('masuk ke if token ada')
      dispatch(LoginRedux(token))
      dispatch(getAllOrderListRedux(token))
      checking_data_product()
      // navigate('/')
    }else {
      console.log('masuk ke if token  gaada ')
      checking_data_product()
    }
    
  },[])

  const checking_data_product=()=>{
    var all_product = JSON.parse(localStorage.getItem('all_product'))
    var all_category = JSON.parse(localStorage.getItem('all_category'))
    var all_subcategory = JSON.parse(localStorage.getItem('all_subcategory'))
    
    console.log(all_product)
    console.log(all_category)
    console.log(all_subcategory)
    // var token = JSON.parse(localStorage.getItem('token'))
    var all_array_groupbuy = []
    var all_array_new = []
    if(  
      (all_product === null || all_product === '') && 
      (all_category === null || all_category === '') &&
      (all_subcategory === null || all_subcategory === ''))
    {
      console.log('dispatch get all product jalan')
        dispatch(GetAllProduct()) // get all product,category,subcategory,category groupbuy, category  new
        setTimeout(()=>{
          console.log(Auth)
          setLoading(false)
        },100)
    }else {
      console.log('masuk ke else line 63 app js')
      dispatch({type:'LOADINGPRODUCT'})
      dispatch({type:'GETALLPRODUCT',allProduct:all_product}) // saving all product to getallProduct
      // console.log(Auth)
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
              dispatch({type:'GETALLCATEGORY',allCategory:all_category}) // saving all data to allcategory
              dispatch({type:'GETALLSUBCATEGORY',allSubCategory:all_subcategory})
              setTimeout(()=>{
                dispatch({type:'ALLPRODUCTLOAD'})
                setLoading(Product.isLoadingProduct)
              },300)
          }
      })
    }
  }

  useEffect(()=>{
    // console.log('useEffecr 89 jalan')
    if(loading){  
      // console.log('loading', Product.isLoadingProduct)
      setLoading(Product.isLoadingProduct)
    }else {
      console.log('loading masih false line 94 useEffect App JS')
    }

  },[Product, Product.isLoadingProduct, ProductFromReducers, loading])

  if(loading){
    // console.log('masih stuck di app page baru jalan')
    return (
      <div className='d-flex justify-content-center align-items-center' style={{height:"100vh", width:"100vw"}}>
          {FullPageLoading(loading,100,'#0095DA')}
      </div>
    )
  }
  
  return (
    <>
      <Routes>
        <Route exact path ='/' element={<Home new_params={"testing"}/>}/>
        <Route exact path ='/ProductDetail/:Product_Code' element={<ProductDetail new_params={"testing"}/>}/>
        <Route exact path ='/beli-langsung/:Product_Code' element={<BuyNow new_params={"testing"}/>}/>
        <Route exact path ='/login' element={<Login new_params={"testing"}/>}/>
        <Route exact path ='/register' element={<Register new_params={"testing"}/>}/>
        <Route exact path ='/Subcategory/:Subcategory' element={<ProductPage new_params={"testing"}/>}/>
        <Route exact path ='/allCategory' element={<Category new_params={"testing"}/>}/>
        <Route exact path ='/cart' element={<Cart new_params={"testing"}/>}/>

        {/* testing page */}
        <Route exact path ='/testing' element={<Testing new_params={"testing"}/>}/>
        <Route exact path ='/map' element={<PigeonMap new_params={"testing"}/>}/>
        {/* testing page */}
      </Routes>
    </>
  );
}

export default App;
