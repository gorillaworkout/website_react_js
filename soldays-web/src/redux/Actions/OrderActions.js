import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()



export const getAllOrderListRedux=(token)=>{
    return (dispatch)=>{
        // var token = JSON.parse(localStorage.getItem('token'))
        if(token){
            axios.post(`https://sales.sold.co.id/get-sales-order-data-per-customer?Customer_Code=${token}`)
            .then((res)=>{
                if(res.data){
                    let allDataOrder = res.data
                    let totalOrder = allDataOrder.length
                    dispatch({type:'GETALLORDERLIST',allOrder:allDataOrder,totalOrder})
                }else {
                }
            }).catch((err)=>{
                console.log(err)
            })
        }else {
            // token gaaada
        }
    }
}