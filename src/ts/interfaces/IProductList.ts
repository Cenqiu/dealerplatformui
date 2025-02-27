export interface IProductInputDto{
    searchText:string | null,
    productType:string | null,
    belongTypeName: string,
    productProps:string | null,
    sort:string,
    pageIndex:number,
    //axios.getProductRequest的接口
}
export interface IProductPropDto{
    belongTypeName:string,
    typeNo:string | null
    // axios.getProp的接口  
}

export interface IProductInfo{
        systemIndex:string,
        searchText:string,
        products:IProductDto[],
        belongTypes:IBelongType[],
        productTypes: IProductType[],
        productProps:any,
        typeSelected:string | null,
        propSelect:any,
        timer:number,
        pageIndex:number

        getProducts:(
            belongTypeName:string,
            productType:string | null,
            searchText:string|null,
            productProps:string|null)=>void,

        getBelongType:()=>void,
        getType: (belongTypeName: string)=>void,
        selectSystemProduct: (belongTypeName:string) =>void,
        selectType:(typeNo:string)=>void,
        // getProducts:Function,老写法
        //传入的是price类型是number 返回值是string
        getProp: (belongTypeName:string,typeNo:string | null)=>void,
        GetPropKey: (key:string,index:number)=>string,
        search:()=>void,
        confirmFilter:()=>void,
        selectProp:(propKey:string,propValue:string)=>void,
        onAddCart:(productNo:string,productNum:number)=>void;
        
}
export interface IProductDto {
    id: number;
    sysNo: string;
    productNo: string;
    productName: string;
    typeNo: string;
    typeName: string;
    productPp: string;
    productXh: string;
    productCz: string;
    productHb: string;
    productHd: string;
    productGy: string;
    productHs: string;
    productMc: string;
    productDj: string;
    productCd: string;
    productGg: string;
    productYs: string;
    unitNo: string;
    unitName: string;
    productNote: string;
    productBzgg: string;
    belongTypeNo: string;
    belongTypeName: string;
    productPhoto: ProductPhoto;
    productSale: ProductSale;
    productSaleAreaDiff: ProductSaleAreaDiff;
}

export interface IBelongType {
    sysNo: string;
    belongTypeName: string;
}
export interface ProductSale {
    id: number;
    sysNo: string;
    productNo: string;
    stockNo: string;
    salePrice: number;
}
export interface ProductSaleAreaDiff {
    id: number;
    sysNo: string;
    productNo: string;
    stockNo: string;
    areaNo: string;
    firstAreaNo: string;
    diffPrice: number;
}
export interface ProductPhoto {
    id: number;
    sysNo: string;
    productNo: string;
    productPhotoUrl: string;
}
export interface IProductType {
    typeNo: string;
    typeName: string;
}
export interface IShoppingCartInputDto{
    customerNo:string;
    productNo:string;
    productNum:number;
}