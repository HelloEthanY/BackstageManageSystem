<template>
	<ul class="layui-nav layui-nav-tree layui-inline" lay-filter="demo" style="margin-right: 10px;">
		<li class="layui-nav-item">
			<router-link href="javascript:;" to="/">首页</router-link>
		</li>
		<li class="layui-nav-item layui-nav-itemed">
			<router-link href="javascript:;" to="/">商品管理</router-link>
			<dl class="layui-nav-child">
				<dd>
					<router-link href="javascript:;" to="/goodsList">商品列表</router-link>
				</dd>
				<dd>
					<router-link to="/" href="javascript:;">新增商品</router-link>
				</dd>
				<dd>
					<router-link to="/" href="javascript:;">选项三</router-link>
				</dd>
			</dl>
		</li>
		<li class="layui-nav-item">
			<router-link to="/" href="javascript:;">订单列表</router-link>
			<dl class="layui-nav-child">
				<dd>
					<router-link to="/" href="javascript:;">移动模块</router-link>
				</dd>
				<dd>
					<router-link to="/" href="javascript:;">后台模版</router-link>
				</dd>
				<dd>
					<router-link to="/" href="javascript:;">电商平台</router-link>
				</dd>
			</dl>
		</li>
		<li class="layui-nav-item">
			<router-link to="/" href="javascript:;">云市场</router-link>
		</li>
	</ul>
</template>

<script>
	export default {
		name: 'LeftNav',
		props: {

		},
		mounted: () => {
			// 要是用左边列表就必须使用下面的代码
			layui.use('element', function() {
				//导航的hover效果、二级菜单等功能，需要依赖element模块
				var element = layui.element;
				//监听导航点击
				element.on('nav(demo)', function(elem) {});
			});
		},
		methods: {

		}
	}
</script>

<style>
	ul {
		text-align: left;
	}

	.layui-nav {
		height: 100%;
		border-radius: 0;
	}
</style>
