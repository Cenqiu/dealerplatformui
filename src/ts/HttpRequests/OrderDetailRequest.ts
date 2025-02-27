import axios from "./AxiosHelper"

export const getOrderInfo = async (saleOrderNo:string)=>{
     var res =await axios.get("OrderInfo",{params:{saleOrderNo}})
     return res.data;
    }
export const BuyAgain = async (saleOrderNo:string)=>{
    var res = await axios.get("OrderInfo/BuyAgain",{params:{saleOrderNo}})
    return res.data;
}