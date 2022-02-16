const INITIAL_STATE = {
    allOrder        :[],
    totalOrder      :0
  
}


// eslint-disable-next-line import/no-anonymous-default-export
export default  (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'GETALLORDERLIST':
            
            return {...state,allOrder:action.allOrder,totalOrder:action.totalOrder}
   
        default:
            return state
    }
}