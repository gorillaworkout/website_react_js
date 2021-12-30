const INITIAL_STATE = {
    cart              :[],
    isLogin           :false,
    isLoading         :false,
    token             : '',
    dataCustomer      :[]
}


// eslint-disable-next-line import/no-anonymous-default-export
export default  (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'LOGIN':
            console.log('login reducer jalan')
            return {...state,isLogin:true,isLoading:false,token:action.token,dataCustomer:action.dataCustomer}
        case 'LOGOUT':
            console.log('logout reducer jalan, semua balik ke state')
            return {INITIAL_STATE}
        case 'LOADING' :
            // console.log('loading jalan')
            return {...state,isLoading:true}
        default:
            return state
    }
}