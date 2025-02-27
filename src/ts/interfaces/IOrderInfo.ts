export interface IOrderListInfo{
    orderList:IOrderSale[],
    GetOrderList:()=>void,
    orderProductNameList:(orderDetails:SaleOrderDetail[])=>string,
    getOrderDetail:(saleOrderNo:string)=>void
}
export interface IOrderSale {
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
}
export interface SaleOrderDetail {
    id: number;
    saleOrderGuid: string;
    saleOrderNo: string;
    productNo: string;
    productName: string;
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