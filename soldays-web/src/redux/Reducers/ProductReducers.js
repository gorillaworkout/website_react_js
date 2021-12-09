const INITIAL_STATE = {
    allProduct          :[],
    allCategory         :[],
    allSubCategory      :[],
    allCategoryGroupBuy :[],
    allCategoryNew      :[]
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
        default:
            return state
    }
}