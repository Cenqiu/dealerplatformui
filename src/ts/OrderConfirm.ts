import { onMounted, reactive,toRefs } from 'vue';
import {addOrder, getInvoice,getOrderConfirmCarts} from '../ts/HttpRequests/OrderConfirmRequest';
import {IOrderConfirmInfo} from './interfaces/IOrderConfirm';
import {tranPrice} from '../untility/common'
import { useRouter } from 'vue-router';
export default {
    setup(){
        var router = useRouter();
        const orderConfirmInfo:IOrderConfirmInfo = reactive(
            {
                carts:[],
                invoices:[],
                deliveryDate:"2025-02-01",
                totalPrice:0,
                remark:"",
                totalNum:0,
                invoiceSelected:'',
                calctotalPrice:()=>{
                    orderConfirmInfo.carts.forEach((cart)=>{
                        var singlePrice = cart.productDto.productSale?.salePrice ?? 0;
                        orderConfirmInfo.totalPrice += cart.productNum * singlePrice;
                        orderConfirmInfo.totalNum += cart.productNum;
                    })
                },
                /*
                    获取交货日期，设置当前时间往后推2天为交货日期 
                */
                setDeliveryDate:()=>{
                    var date = new Date();//创建时间对象
                    var twoDaysLater = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2);//往后推1天
                    var year = twoDaysLater.getFullYear();
                    var month = (twoDaysLater.getMonth() + 1) < 10 ? ('0' + (twoDaysLater.getMonth() + 1)) : (twoDaysLater.getMonth() + 1).toString(); 
                    //获取1天后的月份 因为索引是0-11,0代表1月，所以需要+1
                    var day = twoDaysLater.getDate() < 10 ? ('0' + twoDaysLater.getDate()) : twoDaysLater.getDate().toString();
                    // 获取1天后的日子 (1-31)
                    orderConfirmInfo.deliveryDate = `${year}-${month}-${day}`;
                    console.log(orderConfirmInfo.deliveryDate);
                },
                onSubmitOrder:async()=>{
                    var res = await addOrder({
                        remark:orderConfirmInfo.remark,
                        invoice: orderConfirmInfo.invoiceSelected,
                        deliveryDate: orderConfirmInfo.deliveryDate
                    });
                    console.log("res"+res);
                    if(res != null){
                        var saleOrderNo = res;
                        
                        router.push({ name: 'orderDetail', params: {saleOrderNo} });
                    }
                    else{
                        alert("下单失败");
                        router.push("/ShoppingCart");
                    }
                }
            })
        onMounted(async()=>{
            
            orderConfirmInfo.invoices = await getInvoice();
            if (orderConfirmInfo.invoices.length > 0) {
                orderConfirmInfo.invoiceSelected = orderConfirmInfo.invoices[0].invoiceNo;
            }
            orderConfirmInfo.carts = await getOrderConfirmCarts();
            orderConfirmInfo.calctotalPrice();
            orderConfirmInfo.setDeliveryDate();
        })
        return{...toRefs(orderConfirmInfo),tranPrice};
    }
}