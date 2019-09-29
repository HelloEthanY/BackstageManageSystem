<template>
	<div><button class="layui-btn" v-on:click="back">返回</button></div>
</template>

<script>
	export default{
		name:'goodsDetail',
		methods:{
			back(){
				this.$router.go(-1);
			}
		}
	}
	
	
	
</script>

<style>
</style>
