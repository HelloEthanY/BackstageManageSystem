import Vue from 'vue'
// 导入App.vue文件
import App from './App.vue'
// 导入路由
import VueRouter from 'vue-router'
// 导入路由配置
import routers from './router/router'
// 导入网络请求
/* import axios from 'axios'
import vueAxios from 'vue-axios' */
// 导入配置文件
import myConfig from './config/config.js'

// 导入store 全局数据缓存
// import Vuex from 'vuex'
// 导入全局数据缓存配置文件
import store from './store/store.js'
// 导入jQuery
import $ from 'jquery'

// 使用配置文件
Vue.prototype.$getMyConfig = myConfig;
// 配置网络请求
// Vue.use(vueAxios, axios)

Vue.config.productionTip = false

// 使用路由
Vue.use(VueRouter)
// 创建路由
const router = new VueRouter({
	mode: "history", // 设置路由模型
	routes: routers // 设置路由路径数组
})

// 创建一个Vue对象
new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
