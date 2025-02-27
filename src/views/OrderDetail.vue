<template>
<div>
   <pageHead headText="订单详情" backUrl="/productList"/>
    <div class="order-info">
        <p>
            <img src="/img/icons/Vue.png" alt="">
            <b>订单编号：{{order?.saleOrderNo}}</b>
        </p>
        <ul v-for="orderSingle in order?.orderDetails" :key="orderSingle.id">
            <li>
                <img :src="orderSingle?.productPhotoUrl || '/img/反正也没这张图.jpg'" alt="">
                <p class="p-name">{{orderSingle.productName}}</p>
                
                <p class="p-price">&yen;{{tranPrice(orderSingle.salePrice)}}</p>
                <span> x{{orderSingle.orderNum}}</span>
            </li>
        </ul>
        <div :class="['order-progress',{'order-progress-show':isShowProgress}]">
            <div class="progress-node">
            <el-steps  :active="order?.orderProgress?.stepSn" align-center>
                <el-step title="Step 1" description="下单" />
                <el-step title="Step 2" description="审核" />
                <el-step title="Step 3" description="通知发货" />
                <el-step title="Step 4" description="发货出库" />
                <el-step title="Step 5" description="确认收货" />
            </el-steps>
            </div>
            <div class="show-progress" @click="showProgress()">
                <img src="/img/dealerImgs/down.png" alt="" :class="{'arrow-up':isShowProgress}">
            </div>
        </div>
    </div>
    <div class="order-set">
        <p class="order-set-item"><span>下单时间</span>{{tranTime(order?.inputDate)}}</p>
        <p class="order-set-item"><span>交货日期</span>{{tranTime(order?.deliveryDate,false)}}</p>
        <p class="order-submit">
            <button class="order-cancel" v-if="order?.orderProgress?.stepSn<=3">
                取消订单
            </button>
            <button class="buy-again" @click="OrderBuyAgain(order?.saleOrderNo)">
                再次购买
            </button>
        </p>
        <p class="order-noti">
            <span>共{{totalNum}}件，合计：<b>&yen;{{tranPrice(totalPrice)}}</b></span>
        </p>
        <p class="order-set-item"><span>备注：</span>{{order?.remark}}</p>
        <p class="order-set-item"><span>开票人</span>{{order?.invoiceNo}}</p>
        <p class="order-set-item"><span>发货仓库</span>{{order?.stockNo}}</p>
        <p class="order-set-item"><span>发货联系人</span>null</p>
        <p class="order-set-item"><span>发货联系手机</span>null</p>
    </div>
</div>
</template>

<script lang="ts">
import {onMounted,reactive, toRefs} from 'vue';
import pageHead from '../components/PageHead.vue';
import {BuyAgain, getOrderInfo} from '../ts/HttpRequests/OrderDetailRequest'
import {IOrderDetailInfo, IOrderSaleDto}from '../ts/interfaces/IOrderDetail'
import {tranPrice,tranTime} from '../untility/common'
import { useRoute } from 'vue-router';
export default {
    components:{pageHead},
    setup() {
        const route = useRoute();
        const saleOrderNo = route.params.saleOrderNo as string;
        const orderDetailInfo:IOrderDetailInfo = reactive(
            {
                isShowProgress:false,
                order:{} as IOrderSaleDto,
                totalPrice:0,
                totalNum:0,
                showProgress:()=>
                {
                    orderDetailInfo.isShowProgress = !orderDetailInfo.isShowProgress;
                },
                totalCalcPrice:()=>{
                    orderDetailInfo.totalPrice = 0;
                    orderDetailInfo.order?.orderDetails.forEach(o=>{
                        orderDetailInfo.totalPrice += (o.salePrice*o.orderNum)
                        orderDetailInfo.totalNum += o.orderNum
                        console.log(orderDetailInfo.totalPrice)
                    })
                    
                },
                OrderBuyAgain:async(saleOrderNo:string)=>{
                    await BuyAgain(saleOrderNo);
                    console.log(saleOrderNo)
                }
            })
        onMounted( async()=>{
            
            const saleOrderNo = route.params.saleOrderNo as string;
            console.log("saleOrderNo"+saleOrderNo)
            orderDetailInfo.order =  await getOrderInfo(saleOrderNo);
            orderDetailInfo.totalCalcPrice();
            })
        return {...toRefs(orderDetailInfo),tranPrice,tranTime}   
    }
    
}
</script>
<style lang="scss" scoped src="../scss/OrderDetail.scss">
</style>
