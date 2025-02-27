import {onMounted, reactive,toRefs} from 'vue';
import {getProductRequest,getBelongType,getType,getProp,addCart}from './HttpRequests/ProductListRequest';
import {IProductInfo,IBelongType,IProductDto, IProductType} from '@/ts/interfaces/IProductList';
import { useRoute, useRouter } from 'vue-router';
import {tranPrice} from '../untility/common'
import { useStore } from 'vuex';
export default {
setup(){
    var store = useStore();
    var route = useRoute()
    var router = useRouter()
    const pageController = reactive
    ({
            isShowLeft:false,
            isShowCover:false,
            isShowSearchBtn:false
    })

    const productInfo:IProductInfo = reactive
    ({
            systemIndex:'玩偶',
            searchText:'',
            products:[],
            belongTypes:[],
            productTypes: [],
            productProps:{},
            typeSelected:'',
            propSelect:{},
            timer:0,
            pageIndex:1,

            /*
            * 获取物品
            */
            getProducts:async(
                belongTypeName:string,
                productType:string | null,
                searchText:string  | null,
                productProps:string | null
                )=>{
                      var products =  (await getProductRequest({
                                searchText:searchText,
                                productType : productType,
                                belongTypeName: belongTypeName,
                                productProps: productProps,
                                sort: 'ProductName',
                                pageIndex: productInfo.pageIndex
                            })) as IProductDto[];
                        products.forEach(p => {
                            productInfo.products.push(p)
                        })

            },
    
            getBelongType:async()=>
            {
                productInfo.belongTypes = (await getBelongType()) as IBelongType[]
            },
            /*
            * 点击大类时我们不需要考虑搜索的内容，因为每次点击大类,都应该清空搜索框
            *但是所搜物品时就应该考虑大类
            */
            selectSystemProduct :async (belongTypeName:string) =>{
                productInfo.propSelect = {};
                productInfo.typeSelected = '';
                productInfo.searchText = ''
                router.push(`/productList?belongType=${belongTypeName}`)
            // productInfo.typeSelected = null;
            // productInfo.systemIndex = belongTypeName;
            // await productInfo.getProducts(belongTypeName,null,null);
            // await productInfo.getType(belongTypeName)
            // await productInfo.getProp(belongTypeName,null);
            },

            /*
            * 从后端获取物品类型
            */
            getType: async (belongTypeName: string) => {
            productInfo.productTypes = (await getType(belongTypeName)) as IProductType[]
            },
            /*
            *选择物品类型 时，可以清空搜索栏
            */
            selectType:async(typeNo:string)=>{   
                productInfo.propSelect = {};
                productInfo.searchText = ''
                if(productInfo.typeSelected == typeNo){
                    productInfo.typeSelected= '';
                }else{productInfo.typeSelected=typeNo;}
                setRouter();
                // if(productInfo.typeSelected == typeNo){ productInfo.typeSelected = null;}
                // else{productInfo.typeSelected = typeNo;}
                // productInfo.typeSelected = typeNo;
                // await productInfo.getProducts( productInfo.systemIndex,productInfo.typeSelected, null)
            },
            
            /*
            * 从后端获取物品属性
            */
            getProp: async (belongTypeName:string,typeNo:string|null)=>{
            var res =  await  getProp({belongTypeName,typeNo});
                productInfo.productProps = res;
            },

            /*
            * 搜索物品
            */
            search:()=>{
                clearTimeout(productInfo.timer);
                productInfo.timer=setTimeout(
                    async()=>{setRouter()},1000);
            },        
                //     var url = `/productList?belongType=${productInfo.systemIndex}`
                //     if(productInfo.searchText?.trim() != ''){url +=`&keywords=${productInfo.searchText}`}
                //     if(productInfo.typeSelected?.trim() != ''){ url +=`&keywords=${productInfo.typeSelected}`}
                //     router.push(url)    
                // //      productInfo.products = (await getProductRequest({
                // //             searchText:productInfo.searchText,productType : productInfo.typeSelected,
                // //             belongTypeName: productInfo.systemIndex,sort: 'ProductName',pageIndex: 1})) as IProduct[];
                //     },1000);
                // },        
            /*
            * 获取物品种类属性的名称
            */
            GetPropKey:(key:string,index:number)=>
            {
                return key.split("|")[index];
            },        
            /*
            * 选择属性
            */
            selectProp:(propKey:string,propValue:string)=>{
                if(productInfo.propSelect[propKey] == propValue){
                    productInfo.propSelect[propKey] = ''
                }else{
                    productInfo.propSelect[propKey] = propValue;
                }
                console.log(productInfo.propSelect)
            },
            
            /*
            * 确认选择
            */
            confirmFilter:()=>{
              
                setRouter();
            },


            onAddCart:async(productNo:string,productNum:number)=>{
                var customerNo = localStorage['customerNo'];
                var currentCartNum = store.getters["shoppingCart/getCartNum"]
                store.dispatch("shoppingCart/setCartNum",currentCartNum+1);
               await addCart({
                    customerNo:customerNo,
                    productNo:productNo,
                    productNum:productNum
                })
                
            },
    })          
                /*
                 *将选中的物品属性转化为字符串
                 */
                const productPropToString = ()=>{
                productProps = ''
                for (const key in productInfo.propSelect) {
                    const value = productInfo.propSelect[key]
                   if(value !=''){productProps += `${key}_${value}^`}
                }
                productProps = productProps.substring(0,productProps.length-1);//去掉最后的%5E
                console.log(productProps)
            }
            /*
             * 设置路由
             */
            const setRouter = () =>{
                //根地址，包含根路由以及物品大类信息
                var url = `/productList?belongType=${productInfo.systemIndex}`
                //拼接物品搜索信息
                if(productInfo.searchText?.trim() != ''){
                    url += `&keywords=${productInfo.searchText}`
                }
                //拼接物品类型
                if(productInfo.typeSelected?.trim() != ''){
                    url +=`&type=${productInfo.typeSelected}`
                }
                //拼接属性
                productPropToString()
                if(productProps != ''){
                      url +=`&prop=${productProps}`
                }
                router.push(url)    
                }

            let keywords:string= ""
            let systemIndex:string = ""
            let productType:string= ""
            let productProps:string = ""
            const resolutonAddress=()=>{
            productInfo.searchText = keywords = (route.query.keywords as string) ?? ''
            productInfo.systemIndex = systemIndex = (route.query.belongType as string) ?? '玩偶'
            productInfo.typeSelected = productType = (route.query.type as string) ?? ''
            productProps = (route.query.prop as string) ?? ''
            if(productProps != ''){
                 var arrayProductProps=productProps.split('^')
                 for(let i=0;i<arrayProductProps.length;i++){
                    const element:string = arrayProductProps[i];
                    productInfo.propSelect[element.split("_")[0]] = element.split("_")[1];
                    console.log("A     "+productInfo.propSelect[element.split("_")[0]]);
                    console.log("B     "+element.split("_")[1]);
              
                 }
                }
            }
            const showLeft=()=> {pageController.isShowLeft = !pageController.isShowLeft;}
            const searchFocus=()=>{pageController.isShowSearchBtn = true;}
            const searchBlur=()=>{pageController.isShowSearchBtn = false;}
            const showRight = () => {
            const rightPad = document.querySelector<HTMLElement>(".right-pad");
            if (rightPad) { rightPad.style.right = "0";}
            pageController.isShowCover = true;
            }

            const hideRight = () => {
                pageController.isShowCover = false;
                const dom = document.querySelector(".right-pad") as HTMLElement;
                dom.style.right = "-85%";
            }
            /*
             *监听页面的滚动事件 
             */
            const handleScroll = () => {
                var htmlDom = document.querySelector("html") as HTMLElement
                var htmlHeight = htmlDom.offsetHeight;
                //1.获取当前整个页面长度
                var scrollTop = htmlDom.scrollTop;
                //2.获取滚动条距顶部的距离
                var screenHeight = document.documentElement.clientHeight;
                //3.获得屏幕可视区域的高度
                var diffHeight = htmlHeight - scrollTop -screenHeight;    
                 //4.获取可视区域底部到整个页面底部的距离
                if(diffHeight ==0 &&scrollTop >0){
                    onPageChange();
                    console.log(productInfo.pageIndex)
                }
            }
            const onPageChange = async()=>{
                productInfo.pageIndex++
                await productInfo.getProducts(
                    systemIndex,
                    productType,
                    keywords,
                    productProps
                )
            }
        onMounted(async()=>{
            window.addEventListener('scroll',handleScroll)
           resolutonAddress();

           await productInfo.getProducts(
            systemIndex,
            productType,
            keywords as string,
            productProps);

           await productInfo.getBelongType();
           await productInfo.getType(systemIndex);
           await productInfo.getProp(systemIndex,productType);
        })
        return{
            ...toRefs(pageController),
            ...toRefs(productInfo),
            showLeft,
            searchFocus,
            searchBlur,
            showRight,
            hideRight,
            tranPrice
        }
    }
}
