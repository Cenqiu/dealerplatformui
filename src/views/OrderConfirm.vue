<template>
    <div>
        <div class="back-headed">
            <button @click="backPage"></button>
            <h3>订单确认</h3>
        </div>
        <div class="order-info">
            <p>
                <img src="/img/icons/Vue.png" alt="">
                <b>订单信息</b>
            </p>
            <ul>
                <li v-for="cart in carts" :key="cart.id">
                    <img :src="cart.productDto.productPhoto?.productPhotoUrl" alt="">
                    <p class="p-name">{{cart.productDto?.productName}}</p>
                    <p class="p-price">&yen;{{cart.productDto?.productSale?.salePrice}}</p>
                </li>
            </ul>
        </div>
        <div class="order-set">
            <p class="order-set-item p-remark">
                <span>备注:</span>
                <input type="text" name="" id="" placeholder="选填 对本次交易的说明" v-model="remark">
            </p>
            <p class="order-set-item">
                <span>交货日期</span> 
                <input type="date" name="" id="" v-model="deliveryDate" :min = "deliveryDate">
            </p>
            <p class="order-set-item">
                <span >开票人</span> 
                <select name="" id="" v-model="invoiceSelected">
                    <option  :value="invoice.invoiceNo" v-for="invoice in invoices" :key="invoice.id" >{{invoice.invoiceNo}}</option>
                </select>
            </p>
            <p class="order-noti">
                <span>共{{totalNum}}件，合计：<b>&yen;{{tranPrice(totalPrice)}}</b></span>
                <span>注：显示金额为成本金额，不含运费，实际结算价格，以审单后为准。</span>
            </p>
            <p class="order-submit">
                <button @click = "onSubmitOrder">
                    提交订单
                </button>
            </p>
        </div>
    </div>
</template>
<script lang = "ts">
import OrderConfirm from '@/ts/OrderConfirm';
import { useRouter } from 'vue-router';
export default {
    setup(){
        var router = useRouter();
        const backPage = () => {
            router.push('/ShoppingCart');
        }

        const OrderConfirmRes = OrderConfirm.setup();
        return {...OrderConfirmRes,backPage};
    }
 }
</script>
<style lang="scss" scoped src = "../scss/OrderConfirm.scss">
</style>
