// 导入App.vue
import App from '../App.vue'
// 导入Home.vue
import Home from '../pages/Home.vue'
// 导入GoodsDetail.vue
import GoodsDetail from '../pages/GoodsDetail.vue'
// 导入商品列表
import GoodsList from '../pages/GoodsList.vue'
// 导入登陆
import Login from '../pages/Login.vue'
// 导入注册页面
import Registered from '../pages/Registered.vue'

export default [{
	path: '/', // 顶级路由
	component: App,
	children: [{
			path: '', // 地址为空跳转到首页
			redirect: '/home'
		}, {
			path: '/home', // 首页
			name: 'home',
			component: Home,
			children: [{ // 商品列表
				path: '/goodsList',
				name: 'goodsList',
				component: GoodsList
			}]
		}, { // 商品详情
			path: '/goodsDetail',
			name: 'goodsDetail',
			component: GoodsDetail
		},
		{ // 登陆
			path: '/login',
			name: 'login',
			component: Login
		},
		{ // 注册
			path: '/registered',
			name: 'registered',
			component: Registered
		}
	]
}]
