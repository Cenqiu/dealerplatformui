export interface IOrderDetailInfo{
    isShowProgress:boolean,
    order:IOrderSaleDto,
    totalPrice:number,
    showProgress:()=>void,
    totalCalcPrice:()=>void,
    OrderBuyAgain:(SaleOrderNo:string)=>void,
    totalNum:number;
}
export interface IOrderSaleDto {
    id: number;
    saleOrderNo: string;
    customerNo: string;
    invoiceNo: string;
    inputDate: string;
    stockNo: string;
    editUserNo: string;
    deliveryDate: string;
    remark: string | null;
    orderDetails: SaleOrderDetail[];
    orderProgress: SaleOrderProgress;
    customerInvoice: CustomerInvoice;
}
export interface SaleOrderDetail {
    id: number;
    saleOrderGuid: string;
    saleOrderNo: string;
    productNo: string;
    productName: string | null;
    productPhotoUrl: string | null;
    customerNo: string;
    inputDate: string;
    orderNum: number;
    basePrice: number;
    diffPrice: number;
    salePrice: number;
}
export interface SaleOrderProgress {
    id: number;
    saleOrderNo: string;
    progressGuid: string;
    stepSn: number;
    stepName: string;
    stepTime: string;
}
export interface CustomerInvoice {
    id: number;
    customerNo: string;
    invoiceNo: string;
    invoiceEin: string;
    invoiceBank: string;
    invoiceAccount: string;
    invoiceAddress: string;
    invoicePhone: string;
}