import axios from "./AxiosHelper"

export const getCartNum = async()=>{
    //都可以用
    // var res = await axios.get("ShoppingCart/GetShoppingCartNum);
    var res = await axios.get("ShoppingCart/GetShoppingCartNum");
    return res.data;
}