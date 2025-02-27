import { IShoppingCartSelectedEditDto } from "../interfaces/IShoppingCart";
import axios from "./AxiosHelper";
export const getCart = async ()=>{
    var res = await axios.get("ShoppingCart");
    return res.data;
}

// export const updataCartSelect = async(cartGuids: string[], cartSelected: boolean,productNum: number)=>{
//     var res = await axios.post("ShoppingCart/UpdataCartSelected",{cartGuids,cartSelected,productNum});
//     return res.data;
// }
export const updataCartSelect = async(data:IShoppingCartSelectedEditDto)=>{
        var res = await axios.post("ShoppingCart/UpdataCartSelected",data);
        return res.data;
    }