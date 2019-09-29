// 导入App.vue
import App from '../App.vue'
// 导入Home.vue
import Home from '../pages/Home.vue'
// 导入GoodsDetail.vue
import GoodsDetail from '../pages/goods/GoodsDetail.vue'
// 导入商品列表
import GoodsList from '../pages/goods/GoodsList.vue'
// 导入登陆
import Login from '../pages/Login.vue'
// 导入注册页面
import Registered from '../pages/Registered.vue'
// 导入首页内容页面
import HomePage from '../pages/HomePage.vue'
// 
import GoodsEditor from '../pages/goods/GoodsEditor.vue'
// 导入商品列表
import OrderList from '../pages/orders/OrderList.vue'


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
				},
				{
					path: '/homePage', // 首页内容
					name: 'homePage',
					component: HomePage
				},
				{ // 商品编辑
					path: '/goodsEditor',
					name: 'goodsEditor',
					component: GoodsEditor
				},
				{ // 商品详情
					path: '/goodsDetail',
					name: 'goodsDetail',
					component: GoodsDetail
				},
				{ // 商品列表
					path: '/orderList',
					name: 'orderList',
					component: OrderList
				}
			]
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
