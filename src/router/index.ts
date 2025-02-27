import { createRouter, createWebHashHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import App from '@/App.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/layoutMain',
    name: 'LayoutMain',
    component: () => import('../views/LayoutMain.vue'),
    redirect: '/main',
        children: [
          {
            path: '/main',
            name: 'main',
            component: () => import('../views/Main.vue'),
          },
          {
            path: '/productList',
            name: 'productList',
            component: () => import('../views/ProductList.vue'),
          },
          {
            path: '/shoppingCart',
            name: 'shoppingCart',
            component: () => import('../views/ShoppingCart.vue'),
          },
          {
            path: '/orderConfirm',
            name: 'orderConfirm',
            component: () => import('../views/OrderConfirm.vue'),
          },
          {
            path: '/orderDetail/:saleOrderNo',
            name: 'orderDetail',
            component: () => import('../views/OrderDetail.vue'),
          },
          {
            path: '/orderList',
            name: 'orderList',
            component: () => import('../views/OrderList.vue'),
          }
        ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 添加导航守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (to.matched.length === 0) { // 如果路由不匹配任何路由规则
          if(requiresAuth && !token){
            next('/main');
          }
          else{
            alert('请先登入');
            next({ path: '/' }); // 重定向到404页面
          }
  } else {
    next(); // 否则继续执行正常的路由跳转逻辑
  }
});


export default router