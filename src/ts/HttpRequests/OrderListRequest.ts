import axios from "./AxiosHelper";

export const getOrderListInfo = async()=>{
    var res = await axios.get("OrderInfo/GetOrderList");
    return res.data;
}
export const getOrderNum = async ()=>{
     var res =await axios.get("OrderInfo/GetOrderNum")
     return res.data;
    }