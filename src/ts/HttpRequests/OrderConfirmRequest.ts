import { OrderMasterInputDto } from "../interfaces/IOrderConfirm";
import axios from "./AxiosHelper";

export const getInvoice = async () => {
    var res = await axios.get("Customer/Invoice");
    return res.data;
}

export const getOrderConfirmCarts = async ()=>{
    var res = await axios.get("OrderConfirm");
    return res.data;
}
export const addOrder = async(data:OrderMasterInputDto)=>{
    var res = await axios.post("OrderConfirm",data);
    return res.data;
}