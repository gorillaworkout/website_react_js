const INITIAL_STATE = {
    cart              :[],
    isLogin           :false,
    isLoading         :false,
}


// eslint-disable-next-line import/no-anonymous-default-export
export default  (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'LOGIN':
            return {...state,isLogin:true,isLoading:false}
        case 'LOADING' :
            // console.log('loading jalan')
            return {...state,isLoading:true}
        default:
            return state
    }
}