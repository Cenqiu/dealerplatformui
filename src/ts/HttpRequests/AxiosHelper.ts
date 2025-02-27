import axios from 'axios'
import { useRouter } from 'vue-router';
axios.defaults.baseURL = "http://localhost:5206/";



//axios拦截器分成两类，第一类叫做请求拦截器,第二类叫做响应拦截器
//请求拦截器
axios.interceptors.request.use(
    config => {
        console.log(localStorage["token"]);
        //config内里面写在发送请求之前做些什么
        //判断是否存在token值，如果存在则在请求前给header中加上token
        if(localStorage["token"]){
            if(config?.headers !=null){
                //请求头加上token
                config.headers.Authorization ="Bearer "+localStorage["token"];
            }
            
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)
axios.interceptors.response.use(
    response => {
        //response是服务器返回的数据
        return response;
    },
    error => {
        console.log(error.response.status);
        switch (error.response.status) {
            case 401:
                {
                    // 清除本地存储的token
                    localStorage.removeItem("token");
                    // 使用window.location.href进行重定向
                    window.location.href = '/';
                }
        }
        return Promise.reject(error);
    }
)
export default axios;