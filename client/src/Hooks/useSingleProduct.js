import { useEffect, useState } from "react";
import { Base_Url } from "../Configs/Constants";
import axios from "axios";

export function UseSingleProduct(id){

    const [data,setData] = useState({})
    const [err,setErr] = useState()
    const [loading,setLoading] = useState(false)


    async function CallProduct(id) {

        try{
            setLoading(true)

            const item = await axios.get(`${Base_Url}/products/${id}`)
            setData(item.data)
            setLoading(false)
        }catch(e){
            setErr(e.message)
        }
        
    }

    useEffect(()=>{
        CallProduct(id)
    },[id])

    return {data,loading,err,CallProduct}



}