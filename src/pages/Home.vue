<template>
	<!-- 首页 -->
	<div class="home-container">
		<div class="home-wapper">
			<!-- 头布局 -->
			<div class="home-wapper-header">
				<Header @headerMenuEvent="onClickShowHideNav"></Header>
			</div>
			<!-- 主体布局 -->
			<div class="home-body-content">
				<!-- 左边布局 -->
				<div class="home-body-left" style="display: inline;" id="left-menu">
					<LeftNav></LeftNav>
				</div>
				<!-- 右边布局 -->
				<div class="home-body-right" id="right-content">
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// 头部组件
	import Header from '../components/Header.vue'
	// 左边导航栏组件
	import LeftNav from '../components/LeftNav.vue'

	export default {
		name: 'Home',
		components: {
			Header,
			LeftNav
		},
		created: function() {
			/* 	// 从store里面取数据
				console.log(this.$store.state.userInfo.userName);
				// 从store 里面存数据
				this.$store.commit('saveUserInfo', '赵六'); */
		},
		mounted() { // 挂载
			// 加载数据的时候在这个方法里面执行
			var _this = this;
			// 默认展示首页内容
			_this.$router.push({
				path:'/homePage'
			})
			//一般直接写在一个js文件中
			layui.use(['layer', 'form'], function() {
				var layerDialog = layui.layer;
				// layerDialog.msg('Hello World');
			});
		},
		methods: {
			onClickShowHideNav(e) {
				var leftMenu = document.getElementById('left-menu');
				var rightContent = document.getElementById('right-content');
				if (leftMenu.style.display == "inline") {
					leftMenu.style.display = "none";
					rightContent.style.left = 0;
				} else {
					leftMenu.style.display = "inline";
					rightContent.style.left = 200 + "px";
				}
			}
		}

	}
</script>

<style>
	body {
		background-color: white;
	}

	.home-container {
		width: 100%;
		height: 100vh;
	}

	.home-wapper {
		width: 100%;
		background-color: aliceblue;
		height: 100%;
	}

	/* 头部内容 */
	.home-wapper-header {
		z-index: 50;
		min-width: 500px;
		position: fixed;
		height: 50px;
		width: 100%;
		line-height: 50px;
		background-color: #23262E;
	}

	.home-body-content {
		position: absolute;
		top: 50px;
		width: 100%;
		bottom: 0;
		background-color: #42B983;
	}

	.home-body-left {

		width: 200px;
		float: left;
		height: 100%;
		background-color: antiquewhite;
	}

	.home-body-right {
		float: left;
		left: 200px;
		right: 0;
		position: absolute;
		height: 100%;
		display: inline;
		background-color: white;
	}
</style>
