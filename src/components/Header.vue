<template>
	<!-- 头部组件 -->
	<div class="header-container">
		<ul class="header-wapper">
			<li class="header-menu-item-left header-logo"> {{logoContent}}</li>
			<li class="header-menu-item-left header-menu">
				<img src="../assets/logo.png" @click="onClickMenuCommand()" />
			</li>

			<li class="header-menu-item-right">
				<router-link to="/login" class="logged-out">退出登陆</router-link>
			</li>
			<li class="header-menu-item-right">
				{{userName}}
			</li>
			<li class="header-menu-item-right header-user-content">
				<img class="header-user-item" src="../assets/logo.png" />
				<a href="#" class="header-user-wait">代办</a>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'Header',
		props: {

		},
		data() {
			return {
				logoContent: "管理后台系统",
				userName: "",
			}
		},
		mounted() { // 挂载
			this.isLogin();
		},
		methods: {
			// 判断是否登陆
			isLogin() {
				var _this = this;
				console.log("判断是否登陆")
				if (_this.$store.state.userInfo.userName === '') {
					_this.$router.push({
						path: '/login'
					})
				} else {
					// alert("登陆成功！");
					_this.userName = _this.$store.state.userInfo.userName;
				}
			},
			onClickMenuCommand() {
				console.log("按钮被点击了");
				this.$emit("headerMenuEvent", 'true');
			}
		}
	}
</script>

<style>
	.header-container {
		width: 100%;
		height: 100%;
		color: #FFFFFF;
	}

	.header-wapper {
		font-size: 14px;
		display: inline;
		height: 50px;
		line-height: 50px;
		width: 100%;
	}

	.header-logo {
		margin-left: 20px;
		height: 100%;
		font-weight: bold;
		font-size: 22px;
		font-family: "arial narrow";
	}

	.header-menu {
		margin-left: 30px;
		height: 30px;
		width: 30px;
	}

	.header-menu img {
		width: 30px;
	}

	.header-menu-item-left {
		float: left;
		list-style: none;
		height: 50px;
	}

	.header-menu-item-right {
		float: right;
		list-style: none;
		margin-right: 5px;
	}

	.logged-out {
		text-decoration: none;
		color: #FFFFFF;
	}

	.header-user-content {
		height: 30px;
		margin: 10px 0;
		width: 65px;
	}

	.header-user-item {
		height: 30px;
		float: left;
		display: block;
		width: 30px;
	}

	.header-user-wait {
		float: left;
		width: 35px;
		color: #FFFFFF;
		text-decoration: none;
		text-align: left;
		font-size: 14px;
		line-height: 30px;
		display: block;
		height: 30px;
	}
</style>
