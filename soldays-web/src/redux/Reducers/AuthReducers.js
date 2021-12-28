const INITIAL_STATE = {
    cart              :[],
    isLogin           :false,
    isLoading         :false,
    token             : ''
}


// eslint-disable-next-line import/no-anonymous-default-export
export default  (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'LOGIN':
            console.log('login reducer jalan')
            return {...state,isLogin:true,isLoading:false,token:action.token}
        case 'LOADING' :
            // console.log('loading jalan')
            return {...state,isLoading:true}
        default:
            return state
    }
}