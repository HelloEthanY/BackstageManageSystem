<template>
	<div>
		{{name}}
		<!-- <table class="layui-hide" id="test"></table> -->
	</div>



</template>

<script>
	export default {
		name: 'goodsList',
		components: { // 注册组件

		},
		data() {
			return {
				name: '等哈看的就爱看假大空双击打开氨基酸看',
			}
		},
		mounted: () => {
			// 挂载
			/* layui.use('table',function(){
				var table = layui.table;
				
			})
			 */
			this.loadGoodsListData();
		},
		methods: { // 注册方法
			loadGoodsListData() {
				layui.use('table',function(){
					var table = layui.table;
					
					
					
				})
			}
		}


	}
</script>

<style>
</style>
