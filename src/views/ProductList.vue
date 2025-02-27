<template>
<div>
     <!-- 搜索面板-->
    <div class="search-pad">
        <input type="text" name="" id="" v-model="searchText" @focus="searchFocus()" @blur="searchBlur()" @input="search">
        <button v-show="isShowSearchBtn">搜索</button>
        <button v-show="!isShowSearchBtn" @click="showRight()">筛选</button>
    </div>
     <!-- 物品大类面板-->
    <div class="system-pad">
        <div v-for="belongType in belongTypes" :key="belongType.belongTypeName"
        :class="['system-item',{'system-select':systemIndex==belongType.belongTypeName}]" @click="selectSystemProduct(belongType.belongTypeName)">
            <span>{{belongType.belongTypeName}}</span>
        </div>
    </div>

    <!-- 物品展示列表-->
    <div class="product-list">
        <ul>
            <li v-for="product in products" :key="product.id">
                <img :src="product.productPhoto?.productPhotoUrl" alt="">
                <div>
                    <p class="p-name">{{product.productName}}</p>
                    <p class="p-type">{{product.typeName}}</p>
                    <p class="p-price">&yen;{{tranPrice(product.productSale?.salePrice)}}/个</p>
                    <p class = "p-cart" @click="onAddCart(product.productNo,1)">
                        <em></em>
                        <i>x1</i>
                     </p>
                    
                </div>
            </li>
        </ul>
        <!-- 左边物品类型面板 -->
        <div :class="['left-menu',{'left-menu-show':isShowLeft}]">
            <div class="left-switch" @click="showLeft()">
                <img src="/img/dealerImgs/up.png" alt="">
            </div>
            <ul>
                <li v-for="productType in productTypes" :key="productType.typeNo"
                :class="{'left-item-select': typeSelected == productType.typeNo}"
                @click="selectType(productType.typeNo)"
                >{{productType.typeName}}</li>
            </ul>
        </div>
    </div>
    <!-- 右边物品属性面板 -->
    <div class="right-pad">
        <div class="list-pad">
        <ul class="f-type-list">
            <template v-for = "(values,key) in productProps">
            <li v-if="values.length>0" :key="key">
            <p>{{GetPropKey(key.toString(),1)}}</p>
            <ul class="f-item-list">
                <li 
                v-for="value in values" 
                :key = "value" 
                @click="selectProp(GetPropKey(key.toString(),0),value)">
                <span  :class="{'prop-select':propSelect[GetPropKey(key.toString(),0)] == value}">
                    {{value}}
                </span>
                </li>
            </ul>
            <div class="clear-tag"></div>
            </li>
            </template>
        </ul>
       </div>

        <div class="right-edit">
            <button 
            @click="confirmFilter()" 
            style="background-color:rgb(71,158,211); color:#fff">确定</button>
            <button @click="hideRight()">取消</button>
        </div>
    </div>
    <div class="cover" v-show="isShowCover" @click="hideRight()"></div>
</div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import ProductList from '../ts/ProductList';
export default defineComponent({
  setup() {
    const setupRes = ProductList.setup();
    return setupRes;
    
  }
});
</script>

<style lang="scss" scoped src="../scss/ProductList.scss"></style>

