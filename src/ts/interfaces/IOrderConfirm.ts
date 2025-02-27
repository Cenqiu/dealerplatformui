export interface IOrderConfirmInfo{
    carts:ICarts[],
    invoices:Invoices[],
    deliveryDate:string,
    totalPrice:number,
    remark:string,
    totalNum:number,
    invoiceSelected:string,
    setDeliveryDate:() => void,
    calctotalPrice:() => void,
    onSubmitOrder:() => void
}
export interface Invoices {
    id: number;
    customerNo: string;
    invoiceNo: string;
}
export interface OrderMasterInputDto {
    deliveryDate: string;
    invoice: string;
    remark: string | null;
}
import {ICarts} from "./IShoppingCart";