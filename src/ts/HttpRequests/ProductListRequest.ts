import axios from "./AxiosHelper"
import {IProductInputDto, IProductPropDto, IShoppingCartInputDto} from '../interfaces/IProductList'
export const getProductRequest = async (data: IProductInputDto) => {
        var res = await axios.get("Product", {params:data});
        return res.data;
}
export const getBelongType = async () => {
        var res = await axios.get("Product/GetBelongType");
        return res.data;
}
export const getType = async (belongTypeName:string) => {
        var res = await axios.get("Product/GetProductType?belongTypeName="+belongTypeName)
        return res.data;
}

export const getProp = async (data:IProductPropDto) => {
        var res = await axios.get("Product/GetProductProps",{params:data})
        return res.data;
}
export const addCart = async (data:IShoppingCartInputDto)=>{
    var res = await axios.post("ShoppingCart",data);
    return res.data;
}