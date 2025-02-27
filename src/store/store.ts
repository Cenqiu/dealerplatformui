import { createStore } from "vuex";

export default createStore({
  // state: {
  //   cartNum:0
  // },
  // //专门负责state数据的获取
  // getters: {
  //   getCartNum(state){return state.cartNum}
  // },
  // mutations: {
  //   //调用办法为store.commit("方法名",参数)
  //   //mutations必须同步执行,他负责操作state中数据的增删改
  //   //在mutations中执行异步操作，会引起数据失效，所以需要action在外面包一层，来专门进行异步操作
  //   //但是他最终调用的还是mutations
  //   setCartNum(state,num){
  //       state.cartNum = num;
  //   }
  // },
  // actions: {
  //   //调用办法为 store.dispath("方法名",参数)
  //   setCartNum(context,num){
  //       context.commit('setCartNum',num)
  //   }
  // },
  //当项目非常庞大需要管理的状态非常多的时候
  //Vuex允许我们将Store切分成多个模块(modules)
  //每一个模块都拥有自己的state,mutations,actions,getters
  //但是这样需要分命名空间 这个就叫shoppingCart
  //我调用也要注意命名空间
  modules: {
    shoppingCart:{
      namespaced:true,
      state: {cartNum:0},
      getters: {getCartNum(state){return state.cartNum}},
      mutations: {setCartNum(state,num){ state.cartNum = num;}},
      actions: {setCartNum(context,num){context.commit('setCartNum',num)}},
    },
    orderNumInfo:{
      namespaced:true,
      state: {orderNum:0},
      getters: {getOrderNum(state){return state.orderNum}},
      mutations: {setOrderNum(state,num){ state.orderNum = num;}},
      actions: {setOrderNum(context,num){context.commit('setOrderNum',num)}},
    }
  },

});