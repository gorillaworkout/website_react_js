import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure()
export const LoginRedux=(token)=>{
    
    return(dispatch)=>{
        axios.post(`https://customers.sold.co.id/get-customer-information?Customer_Code=${token}`)
        .then((res)=>{
            var stringify_token = JSON.stringify(token)
            var dataCustomer = res.data
            localStorage.setItem('token',stringify_token)
            dispatch({type:'LOGIN',token,dataCustomer})
            
        }).catch((err)=>{
            console.log(err)
        })
   
    }
}

export const LogoutRedux=()=>{
    return (dispatch)=>{
        
        // console.log('logout redux jalan')
        localStorage.removeItem('token')
        dispatch({type:'LOGOUT'})
        toast.error('Berhasil Logout', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}