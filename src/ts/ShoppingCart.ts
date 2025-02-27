
import { IShoppingCartInfo,ICarts,ITypes } from '@/ts/interfaces/IShoppingCart';
import { onMounted, reactive, toRefs,ref,watch, nextTick} from 'vue';
import { getCart,updataCartSelect} from './HttpRequests/ShoppingCartRequest';
import { tranPrice } from '../untility/common';
import { useStore } from 'vuex';
export default {
  setup() {
   const store =  useStore();
    const shoppingCartInfo:IShoppingCartInfo = reactive({
        carts:[],
        types:[],
        totalPrice:0,
        isAllSelected:false,

        onAddNum:async(cart:ICarts)=>{
            cart.productNum++;
            await updataCartSelect({ 
              cartGuids: [cart.cartGuid], 
              cartSelected: cart.cartSelected, 
              productNum: cart.productNum });
        },
        onSubNum:async (cart:ICarts)=>{
            if( cart.productNum> 0){
                cart.productNum--;
               var res = await updataCartSelect({ 
                  cartGuids: [cart.cartGuid], 
                  cartSelected: cart.cartSelected, 
                  productNum: cart.productNum });
                  //删掉数量到0的
                  if( res == 'RemoveSuccess'){
                    // var index = shoppingCartInfo.carts.findIndex(m=>m.id == cart.id);
                    var index = shoppingCartInfo.carts.findIndex(m=> m == cart);
                    shoppingCartInfo.carts.splice(index,1);//在这个索引删掉一个
                  }
                }
              },
              
        onChangeNum: (cart: ICarts, event: Event) => {
            //通过点击事件,获取当前控件的值
            const target = event.target as HTMLInputElement;
            const currNum = parseInt(target.value);//转化为数字类型
            //判断这个值是个数字并且大于0时，把这个值赋值给响应式变量cart.productNum
            //否则用cart.productNum的值还原input控件中的内容
            if (!isNaN(currNum) && currNum > 0) {
              cart.productNum = currNum;
            } 
            else {
              target.value = cart.productNum.toString();
            }
          },
       //获取购物车信息
        onGetShoppingCarts: async()=>{

            var res = await getCart();
            shoppingCartInfo.carts = res.carts;
            shoppingCartInfo.types = res.types;
        },
        //点击选择购物车物品的√触发
        onSelectCart:async(cart:ICarts)=>{
          cart.cartSelected = !cart.cartSelected;
            await updataCartSelect({ 
                  cartGuids: [cart.cartGuid], 
                  cartSelected: cart.cartSelected, 
                  productNum: cart.productNum });
          //找到类型中对应设置物品的类型  
          // var type = shoppingCartInfo.types.filter(t=>t.typeNo == cart.productDto.typeNo)[0];
          // var cartOfType = shoppingCartInfo.carts.filter(
          //   m=>m.productDto?.typeNo == type?.typeNo); 

            shoppingCartInfo.checkTypeSelected();
           
        },
        //根据类型勾选购物车商品
        onSelectType:(type:ITypes)=>{
          const cartGuids:string[] = [];
          type.typeSelected = !type.typeSelected;
          shoppingCartInfo.carts.filter(c=>c.productDto?.typeNo == type?.typeNo)//选出购物车中有的且和勾选typeNo相等的集合
          .forEach( c=>{
            cartGuids.push(c.cartGuid);
            c.cartSelected = type?.typeSelected
             updataCartSelect({ 
              cartGuids: [c.cartGuid], 
              cartSelected: c.cartSelected, 
              productNum: c.productNum });
            // updataCartSelect(cartGuids,type.typeSelected)
          })//然后让我购物车里面选择的状态都和这个类型的状态一致
          
        },
        onDeleType: ()=>{
          shoppingCartInfo.types= shoppingCartInfo.types.filter(type => 
            shoppingCartInfo.carts.some(cart => cart.productDto?.typeNo == type.typeNo));
        },
        /*
         *检测是否选中某一类下的所有物品
         */
        checkTypeSelected:()=>{
          shoppingCartInfo.types.forEach(type=>{
            //查看当前类型下的物品是否都被选择,是则将属于类型选择
            //否则就不选中
            const cartGuids:string[] = [];
          
            var cartOfType = shoppingCartInfo.carts.filter(c=>c.productDto?.typeNo == type?.typeNo); 
            if(cartOfType.every(m=>m.cartSelected ==true)){
            type.typeSelected = true;
            
            }
            else{
              type.typeSelected = false;
            }
            })
            shoppingCartInfo.checkAllSelected();
        },
        /*
         *检测是否选择所有物品
         */
        checkAllSelected:()=>{
          if(shoppingCartInfo.carts.every(m=>m.cartSelected == true)){
            shoppingCartInfo.isAllSelected = true;
          }
          else{
            shoppingCartInfo.isAllSelected = false;
          }
        },
        //全选和取消全选
        allSelectToggle:()=>{
          shoppingCartInfo.carts.forEach(c=>{
            c.cartSelected = !shoppingCartInfo.isAllSelected;
            updataCartSelect({ 
              cartGuids: [c.cartGuid], 
              cartSelected: c.cartSelected, 
              productNum: c.productNum });
          })      
        },

        //计算全部价格
        calcTotalPrice:()=>{
          let currentCartNum = 0;
            shoppingCartInfo.totalPrice = 0;
            shoppingCartInfo.carts.filter(m=>m.cartSelected == true)
            .forEach(c=>{
            var singlePrice = c.productDto?.productSale?.salePrice ?? 0;
            shoppingCartInfo.totalPrice += singlePrice * c.productNum;//算总价
            currentCartNum += c.productNum;  //算购物车有几个勾选的商品
           
          })
          // shoppingCartNum.value = currentCartNum;
          store.dispatch("shoppingCart/setCartNum",currentCartNum);
        },
        //处理空类型的物品
        transTypeWithNull:(type:string)=>type ?? "其他",
        transPriceWithNull:(price:number)=>price ?? 0,
        
    })
    /*
     *对carts进行深度监听 
     */
    watch(()=>shoppingCartInfo.carts,
    (newValue,oldValue)=>{
      shoppingCartInfo.checkTypeSelected();
      shoppingCartInfo.calcTotalPrice();
      shoppingCartInfo.onDeleType();
    },
      {deep:true})//是否深度监听，一般监听对象或者是数组，咱都需要深度监听
    
      //页面加载时触发
    onMounted(async()=>{
        await shoppingCartInfo.onGetShoppingCarts();
        shoppingCartInfo.checkTypeSelected(),
        shoppingCartInfo.calcTotalPrice()
    }
  )
    return {...toRefs(shoppingCartInfo),tranPrice}
    }
   
}
