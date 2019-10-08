<template>
	<div>
		<button class="layui-btn" v-on:click="enter">进入</button>
	</div>
</template>

<script>
	export default {
		name: 'orderList',
		methods: {
			enter() {
				var _this = this;
				/* this.$router.push({
					name:'orderList'
				}); */
				_this.$router.push({
					path: '/goodsDetail'
				})
			}
		}
	}
</script>

<style>
</style>
