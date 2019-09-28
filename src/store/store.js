import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		// 存储一个公共状态
		email: '',
		userInfo: {
			userName: '张三',
			token: '',
			headImg: ''
		}
	},
	mutations: {
		/* 在其他地方存、取数据
		 * 从store里面取数据
		 *	console.log(this.$store.state.userInfo.userName);
		 * 从store 里面存数据
		 *	this.$store.commit('saveUserInfo','赵六');
		 *
		 */
		// 此处定义方法必须要有 state
		saveUserInfo(state, name) {
			state.userInfo.userName = name;
		}
	}
})

export default store
