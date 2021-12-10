const INITIAL_STATE = {
    allProduct          :[],
    allCategory         :[],
    allSubCategory      :[],
    allCategoryGroupBuy :[],
    allCategoryNew      :[],
    isLoadingProduct    :true
} 


// eslint-disable-next-line import/no-anonymous-default-export
export default  (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'GETALLPRODUCT' :
            return {...state,allProduct:action.allProduct}
        case 'GETALLCATEGORY' :
            return {...state,allCategory:action.allCategory}
        case 'GETALLSUBCATEGORY' :
            return {...state,allSubCategory:action.allSubCategory}
        case 'GETALLCATEGORYGROUPBUY':
            return {...state,allCategoryGroupBuy:action.allCategoryGroupBuy}
        case 'GETALLCATEGORYNEW':
            return {...state,allCategoryNew:action.allCategoryNew}
        case 'LOADINGPRODUCT' :
            console.log('loading jalan',state.isLoadingProduct)
            return {...state,isLoadingProduct:true}
        case 'ALLPRODUCTLOAD':
            console.log('allProductload harusnya udh false')
            return {...state,isLoadingProduct:false}
        default:
            return state
    }
}