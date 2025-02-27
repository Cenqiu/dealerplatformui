import { IProductDto} from "@/ts/interfaces/IProductList";
export interface IShoppingCartInfo {
    carts:ICarts[],
    types:ITypes[],
    totalPrice:number,
    isAllSelected:boolean,
    onAddNum:(cart:ICarts)=>void,
    onSubNum:(cart:ICarts)=>void,
    onChangeNum:(cart: ICarts, event: Event)=>void,
    onGetShoppingCarts:()=>void,
    transTypeWithNull:(type:string)=>string,
    onSelectCart:(cart:ICarts)=>void,
    onSelectType:(type:ITypes)=>void,
    checkAllSelected:()=>void,
    checkTypeSelected:()=>void,
    calcTotalPrice:()=>void,
    transPriceWithNull: (price: number) => number,
    allSelectToggle:()=>void,
    onDeleType: ()=>void,

}
export interface ICarts{
        id: number;
        cartGuid: string;
        customerNo: string;
        productNo: string;
        productNum: number;
        cartSelected: boolean;
        productDto: IProductDto;
    
}
export interface ITypes{
   
   typeName:string,
   typeNo:string,
   typeSelected:boolean

}
export interface IShoppingCartSelectedEditDto {
    cartGuids: string[];
    cartSelected: boolean;
    productNum: number;
}
