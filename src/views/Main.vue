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
    <router-link to="/orderList" v-slot="{ navigate }" custom>
    <div class="menu-item" >
      <img src="/img/dealerImgs/purchase_order.png" alt="" @click="navigate" />
      <div class="menu-info" @click="navigate">
        <p class="m-title">我的订单</p>
        <p class="m-info">订单数量：{{store.getters["orderNumInfo/getOrderNum"]}}个</p>
      </div>
    </div>
  </router-link>
    <router-link to="/shoppingCart" v-slot="{ navigate }" custom>
      <div class="menu-item" >
        <img src="/img/dealerImgs/shopping212.png" alt="" @click="navigate" />
        <div class="menu-info" @click="navigate">
          <p class="m-title">购物车</p>
          <p class="m-info">购物车中有：{{store.getters["shoppingCart/getCartNum"]}}个待下单的物品</p>
        </div>
      </div>
    </router-link>
    <div class="menu-item" >
      
      <div class="menu-info" >
        <img src="/img/dealerImgs/door.png" alt="" @click="Logout"/>
        <p class="m-title" @click="Logout">退出账号</p>
        <p class="m-info">退出当前帐号</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive } from 'vue';
import { shoppingCartNum } from '../store'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { getOrderNum } from '@/ts/HttpRequests/OrderListRequest';
export default {
  setup () {
   var store = useStore();
   var router = useRouter();
   const MainInfo = reactive({

    Logout:()=>{
      localStorage.removeItem('customerNo');
      localStorage.removeItem('token');
      router.push("/");
    },
   });
   const getOrderNumInfo = async()=>{
     let currentNum = await getOrderNum();
    store.dispatch("orderNumInfo/setOrderNum",currentNum)
    }
   onMounted(async()=>{
    await getOrderNumInfo();
   })
    return {...MainInfo,shoppingCartNum,store}
  }
}

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

.menu-item {
text-align-last: left;
  height: 60px;
  background-color: #fff;
  margin-top: 10px;
  padding: 6px;
  position: relative;
  padding-left: 60px;

  img {
    position: absolute;
    top: 20px;
    left: 20px;
  }

  .menu-info {
    p.m-title {
      margin-top: 10px;
      font-weight: bold;
      font-size: 15px;
    }
    p.m-info {
      margin-top: 8px;
      font-size: 12px;
    }
  }
}
</style>
