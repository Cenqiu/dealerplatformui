<template>
<div>
    <div class="cart-list">
        <ul>
            <li v-for="type in types" :key="type.typeName">
                <p>
                    <i :class="{'cart-select':type.typeSelected}" @click = "onSelectType(type)">✔</i>
                    <span>{{transTypeWithNull(type.typeName)}}</span>
                </p>
                <template v-for="cart in carts" >
                    <div v-if="cart.productDto?.typeNo==type.typeNo" :key="cart.id">
                    <i :class="{'cart-select':cart.cartSelected}" @click="onSelectCart(cart)">✔</i>
                    <img :src="cart.productDto.productPhoto?.productPhotoUrl" alt="">
                    <p class="p-name">{{cart.productDto?.productName}}</p>
                    <p class="p-price">&yen;{{tranPrice(transPriceWithNull(cart.productDto?.productSale?.salePrice))}}</p>
                    <p class="p-num">
                        <span  @click="onSubNum(cart)">-</span>
                        &nbsp;
                        <input type="number" name="" id="" :value="cart.productNum" @change="(event) => onChangeNum(cart, event)"/>
                        <span  @click="onAddNum(cart)">+</span>
                        <b>个</b>
                    </p>
                </div>
                </template>
                
            </li>
        </ul>
    </div>
    <div class="total-pad">
        <i :class="{'cart-select':isAllSelected}" @click="allSelectToggle">✔</i>
        <span>全选</span>
        <span>
            合计：&yen;{{tranPrice(totalPrice)}} <b></b>
        </span>
        <button @click="confirmOrder">确定下单</button>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ShoppingCart from '../ts/ShoppingCart';
import { useRouter } from 'vue-router';
export default defineComponent({
    setup(){ 
        const router = useRouter();
        const setupRes = ShoppingCart.setup();
        const confirmOrder = () => {
        router.push('/OrderConfirm')
    };
        return {...setupRes,confirmOrder};
    }
})
</script>

<style lang="scss" scoped src="../scss/ShoppingCart.scss"></style>