import axios from 'axios'
// import { GrAction } from 'react-icons/gr'


export const GetAllProduct=()=>{
    return (dispatch)=>{
        dispatch({type:'LOADING',isLoading:true})
          var all_array_groupbuy = []
          var all_array_new      = []
        axios.post('https://products.sold.co.id/get-product-details')
        .then((res)=>{
            var allProduct = res.data
            dispatch({type:'GETALLPRODUCT',allProduct:allProduct})
            var stringify_all_product = JSON.stringify(res.data)
            localStorage.setItem('all_product',stringify_all_product)
            res.data.forEach((val,index,array)=>{
                if(val.GroupBuy_Purchase === true || val.GroupBuy_Purchase === 'true'){
                    all_array_groupbuy.push(val)
                    // setAllProductGroupbuy(all_array_groupbuy)
                }
                if (val.Categorize_NEW === true || val.Categorize_NEW === 'true') {
                    all_array_new.push(val)
                    // setAllProductNew(all_array_new)
                }
                if(index === array.length - 1){
                    dispatch({type:'GETALLCATEGORYGROUPBUY',allCategoryGroupBuy:all_array_groupbuy})
                    dispatch({type:'GETALLCATEGORYNEW',allCategoryGroupNew:all_array_new})
                }
            })

            // GET ALL CATEGORY
            axios.post(`https://products.sold.co.id/get-product-details?Get_ALL_Category=true`)
            .then((res)=>{
                var stringify_all_product = JSON.stringify(res.data)
                localStorage.setItem('all_category',stringify_all_product)
                dispatch({type:'GETALLCATEGORY',allCategory:res.data})

                var all_array_subcategory = []
                var allCategory = res.data
                allCategory.forEach((val,index,array)=>{
                    axios.post(`https://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${val.Category}`)
                    .then((res)=>{
                        if(res.data.length > 0){
                            res.data.forEach((val,index,array)=>{
                                all_array_subcategory.push(val)
                            })
                            
                        }else {
                            all_array_subcategory.push(res.data)
                            // setLoadingFetchingData(false)
                        }
                        var stringify_subcategory = JSON.stringify(all_array_subcategory)
                        localStorage.setItem('all_subcategory',stringify_subcategory)
                        if(index === array.length - 1 ){
                            dispatch({type:'GETALLSUBCATEGORY',allSubCategory:all_array_subcategory})
                            dispatch({type:'LOADING',isLoading:false})
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                })

            }).catch((err)=>{
                console.log(err)
            })

        }).catch((err)=>{
            console.log(err)
        })
    }
}

export const getAllSubCategory=(Category)=>{
    return (dispatch)=>{
        var all_array_subcategory = []
        var allCategory = Category
        allCategory.forEach((val,index,array)=>{
            axios.post(`https://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${val.Category}`)
            .then((res)=>{
                if(res.data.length > 0){
                    res.data.forEach((val,index,array)=>{
                        all_array_subcategory.push(val)
                    })
                    
                }else {
                    all_array_subcategory.push(res.data)
                    // setLoadingFetchingData(false)
                }
                var stringify_subcategory = JSON.stringify(all_array_subcategory)
                if(index === array.length - 1 ){
                    localStorage.setItem('all_subcategory',stringify_subcategory)
                    dispatch({type:'GETALLSUBCATEGORY',allSubCategory:all_array_subcategory})
                    dispatch({type:'LOADING',isLoading:false})
                    console.log('dispatch loading, harusnya false')
                }
            }).catch((err)=>{
                console.log(err)
            })
        })
    }
}