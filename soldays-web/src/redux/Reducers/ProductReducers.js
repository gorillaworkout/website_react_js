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
            return {...state,...action.payload,allProduct:action.allProduct}
        case 'GETALLCATEGORY' :
            return {...state,...action.payload,allCategory:action.allCategory}
        case 'GETALLSUBCATEGORY' :
            return {...state,...action.payload,allSubCategory:action.allSubCategory}
        case 'GETALLCATEGORYGROUPBUY':
            return {...state,...action.payload,allCategoryGroupBuy:action.allCategoryGroupBuy}
        case 'GETALLCATEGORYNEW':
            return {...state,...action.payload,allCategoryNew:action.allCategoryNew}
        case 'LOADINGPRODUCT' :
            console.log('loading jalan',state.isLoadingProduct)
            return {...state,isLoadingProduct:true}
        case 'ALLPRODUCTLOAD':
            return {...state,isLoadingProduct:false}
        default:
            return state
    }
}