<template>
  <div>
    <div class="user-box">
      <div class="user-info">
        <div class="user-head">
          <img src="/img/dealerImgs/picUser.png" alt="" class="" />
        </div>
        <p class="user-name">涔秋涔秋涔</p>
        <p>销售员：涔秋</p>
        <p>单位地址：江西省抚州</p>
      </div>
    </div>
    <div class="order-info" >
        <p>
            <img src="/img/icons/Vue.png" alt="">
            
        </p>
        <ul v-for="order in orderList" :key="order.id">
            <li >
                <p class="p-name">订单编号：{{order.saleOrderNo}}</p>
                <p class="p-name">下单时间：{{tranTime(order.inputDate)}} 
                  <el-button class = "p-elbutton" type="primary" @click="getOrderDetail(order.saleOrderNo)">详情</el-button>
                  </p>    
                <p class="p-name">订单缩略：{{orderProductNameList(order.orderDetails)}}
                  
                 
                </p>
    
            </li>
        </ul>
        <div class="order-noInfo" >
        <p class="p-noInfo" v-if="orderList.length === 0">没有订单</p>
        </div>
    </div>
  </div>
</template>

<script lang="ts">

import { getOrderListInfo } from '@/ts/HttpRequests/OrderListRequest';

import { IOrderListInfo, IOrderSale, SaleOrderDetail } from '@/ts/interfaces/IOrderInfo';
import { onMounted, reactive } from 'vue';
import { tranTime } from '@/untility/common';
import { useRouter } from 'vue-router';
export default ({
  setup() {
    var router = useRouter();
    const OrderListInfo:IOrderListInfo = reactive({
      orderList:[],
      GetOrderList:async()=>{
      var products= (await getOrderListInfo()) as IOrderSale[];
      products.forEach(p => {
        OrderListInfo.orderList.push(p);
      });
    },
    orderProductNameList:(orderDetails:SaleOrderDetail[])=>{
      let productNameList = '';
        if(orderDetails.length > 0){
          for(var i = 0; i < 3; i++){
            if(orderDetails[i] != null){
              productNameList += orderDetails[i].productName + ' ';
            }
          }
          productNameList = productNameList.trim() + "等";
        }
      return productNameList;
    },
    getOrderDetail:(saleOrderNo:string)=>{

        // 跳转到 OrderDetail 页面，并传递 saleOrderNo 作为路由参数
        router.push({ name: 'orderDetail', params: {saleOrderNo} });
        

    }
    });
    onMounted(async()=>{
      await OrderListInfo.GetOrderList();
      OrderListInfo.orderList.sort((a, b) => a.id - b.id);
      
    })
    return{...OrderListInfo,tranTime}
  },
})
</script>


<style lang="scss" scoped>

.user-box {
  padding: 10px;
  background-color: #fff;

  .user-info {
    padding: 25px 0 25px 80px;
    height: 120px;
    border-radius: 10px;
    position: relative;
    background: -webkit-linear-gradient(left, rgb(71,158,211), rgb(71,158,211));

    p {
      color: #fff;
      text-align: left;
      font-size: 14px;
      margin-bottom: 16px;
      color: hsla(0, 0%, 100%, 0.7);
    }

    p.user-name {
      letter-spacing: 2px;
      font-weight: bold;
      font-size: 16px;
      color: #fff;
    }

    .user-head {
      width: 40px;
      height: 40px;
      border-radius: 40px;
      border: 2px solid #fff;
      overflow: hidden;
      background-color: #fff;
      position: absolute;
      top: 36px;
      left: 20px;

      img {
        width: 40px;
        height: 40px;
      }
    }
  }
}

.order-info {
  
    background-color: #fff;

    p {
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        img {
            border-radius: 22px;
            width: 26px;
            height: 26px;
            vertical-align: middle;
        }

        b {
            font-size: 14px;
            margin-left: 10px;
            color: #333;
        }
    }

    ul {
        padding-bottom: 7px;

        li {
          
            padding: 20px 0px 20px 0px;
            height: 110px;
            position: relative;
            border-bottom: 1px solid #ddd;
            background-color: #fff;

            p {
                height: 25px;
                line-height: 25px;
            }

            .p-name {
                font-size: 13px;
                font-weight: bolder;
            }
            .p-price {
                color: rgb(71,158,211);
                font-size: 14px;
                font-weight: bolder;
            }
            .p-elbutton{
              position: relative;
                    float: right;
                    margin-right: 0px;
                    width: 13%;
                    font-size: 13px;
                    height: 100%;
            }
            
           
        }
    }
}
.order-noInfo{
  text-align: center;
}
</style>
