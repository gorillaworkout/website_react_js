import axios from 'axios'


class getTikiCollection {

    getAllCourier=async()=>{
        const getData = await axios.post(`http://products.sold.co.id/get-courier-data?Get_All_Couriers=true`)
        const allArray = await getData.data[0]
        return allArray
    }

    getTesting=async()=>{
        return 'bisa nih'
        
    }

   


    getAllProvince=async(courier_name,courier_code)=>{
        console.log(courier_name,courier_code)
        const getData = await axios.post(`https://products.sold.co.id/get-courier-data?Courier=${courier_name}&Courier_Code=${courier_code}&Get_All_Province=true`)
        const allArray = await getData.data
        return allArray
    }

    getAllCity=async(courier_name,courier_code,province)=>{
        const getData =  await  axios.post(`https://products.sold.co.id/get-courier-data?Courier=${courier_name}&Courier_Code=${courier_code}&Province=${province}`)
        const allArray =  await getData.data
        return allArray

    }
    
    getAllDistrict=async(courier_name,courier_code,city)=>{

        const getData =  await  axios.post(`https://products.sold.co.id/get-courier-data?Courier=${courier_name}&Courier_Code=${courier_code}&City=${city}`)
        const allArray =  await getData.data
        return allArray
    }
    getAllSubdistrict=async(courier_name,courier_code,district)=>{
        const getData =  await axios.post(`https://products.sold.co.id/get-courier-data?Courier=${courier_name}&Courier_Code=${courier_code}&District=${district}`)
        const allArray =  await getData.data
        return allArray

    }
}



export default new getTikiCollection()