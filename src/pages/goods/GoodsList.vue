<template>
	<div class="goods-list-container">
		<table class="layui-hide" id="shopList" lay-filter="shop-layui" style="padding-top: -20px;"></table>
		<!--自定义头部工具栏-->
		<script type="text/html" id="toolbarShop">
			<div class="layui-btn-container" style="text-align: left;">
				<button class="layui-btn layui-btn-sm" lay-event="add">添加</button>
				<button class="layui-btn layui-btn-sm" lay-event="delete">删除</button>
			</div>
		</script>
		<!--查看-编辑-删除-->
		<script type="text/html" id="barShop">
			<a class="layui-btn layui-btn-primary layui-btn-sm" lay-event="detail">查看</a>
			<a class="layui-btn layui-btn-sm" lay-event="edit">编辑</a>
			<a class="layui-btn layui-btn-danger layui-btn-sm" lay-event="del">删除</a>
		</script>
	</div>
</template>

<script>
	// import HelloWorld from '../components/HelloWorld.vue'

	// 全局变量
	var laydate;
	var laypage;
	var layer;
	var table;
	var carousel;
	var upload;
	var element;
	var slider;

	export default {
		name: 'goodsList',
		components: { // 注册组件
			// HelloWorld
		},
		data() {
			return {
				baseUrl: this.$getMyConfig.getBaseUrl("baseUrl"),
			}
		},
		mounted: function() {
			// 挂载
			var _this = this;

			layui.use(['laydate', 'laypage', 'layer', 'table', 'carousel', 'upload', 'element', 'slider'], function() {
				laydate = layui.laydate; //日期
				laypage = layui.laypage; //分页
				layer = layui.layer; //弹层
				table = layui.table; //表格
				carousel = layui.carousel; //轮播
				upload = layui.upload; //上传
				element = layui.element; //元素操作
				slider = layui.slider; //滑块
				// 请求数据
				_this.loadGoodsListData();
			});

		},
		methods: { // 注册方法
			loadGoodsListData() {
				var _this = this;
				layer.load(1);
				$.ajax({
					type: "post",
					url: _this.baseUrl + "/mobile/home/QueryGoodsList",
					async: true,
					headers: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						currpage: 1,
						userId: "71c33fa8d957bf71fed3c47c974988ce1405057a"
					},
					dataType: "json",
					success: function(res) {
						if (res.code == 200) {
							setTimeout(function() {
								layer.closeAll('loading');
							});
							_this.tableShop(res.result);
						} else {
							setTimeout(function() {
								layer.closeAll('loading');
								layer.msg(res.message);
							});
						}
					},
					error: function(error) {
						setTimeout(function() {
							console.log("error:" + JSON.stringify(error));
							layer.closeAll('loading');
							layer.msg('请求失败！');
						});
					}
				});
			},
			tableShop(data) {
				var _this = this;
				//执行一个 table 实例
				table.render({
					elem: '#shopList',
					height: 660,
					title: '用户表',
					page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
						layout: ['prev', 'page', 'next', 'skip', 'count'], //自定义分页布局
						//,curr: 5 //设定初始在第 5 页
						groups: 1, //只显示 1 个连续页码
						first: false, //不显示首页
						last: false, //不显示尾页
						limit: 5,
					},
					toolbar: '#toolbarShop', //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
					totalRow: false, //开启合计行
					data: data,
					cols: [
						[ //表头
							{
								type: 'checkbox',
								fixed: 'left'
							}, {
								field: 'id',
								title: 'ID',
								width: '9%',
								sort: true,
								fixed: 'left',
								totalRowText: '合计：'
							},
							{
								field: 'showImg',
								title: '商品logo',
								width: '10%',
								templet: '<div><img src="http://192.168.17.115:8033{{d.showImg}}"></div>'
							},
							{
								field: 'subTitle',
								title: '商品名称',
								width: '12%'
							}, {
								field: 'price',
								title: '现价',
								width: '7%',
								sort: true,
								totalRow: true
							}, {
								field: 'oldPrice',
								title: '原价',
								width: '7%',
								sort: true
							}, {
								field: 'detail',
								title: '简介',
								sort: true,
								totalRow: true
							}, {
								fixed: 'right',
								title: '操作',
								width: '16%',
								align: 'center',
								toolbar: '#barShop'
							}
						]
					]
				});

				//监听头工具栏事件
				table.on('toolbar(shop-layui)', function(obj) {
					var checkStatus = table.checkStatus(obj.config.id),
						data = checkStatus.data; //获取选中的数据
					switch (obj.event) {
						case 'add':
							layer.msg('添加');
							_this.$router.push({
								name:'goodsEditor'
							})
							break;
						case 'update':
							if (data.length === 0) {
								layer.msg('请选择一行');
							} else if (data.length > 1) {
								layer.msg('只能同时编辑一个');
							} else {
								layer.alert('编辑 [id]：' + checkStatus.data[0].id);
							}
							break;
						case 'delete':
							if (data.length === 0) {
								layer.msg('请选择一行');
							} else {
								layer.msg('删除');
							}
							break;
					};
				});

				//监听行工具事件
				table.on('tool(shop-layui)', function(obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
					var data = obj.data, //获得当前行数据
						layEvent = obj.event; //获得 lay-event 对应的值
					console.log(JSON.stringify(data))

					if (layEvent === 'detail') {
						_this.$router.push({
							name: 'goodsEditor',
							params: {
								id: data.id,
								type: '查看商品'
							}
						});
						layer.msg('查看操作');
					} else if (layEvent === 'del') {
						layer.confirm('真的删除行么', function(index) {
							obj.del(); //删除对应行（tr）的DOM结构
							layer.close(index);
							//向服务端发送删除指令
						});
					} else if (layEvent === 'edit') {
						layer.msg('编辑操作');
						// 点击弹出一个html内容
						_this.$router.push({
							name: 'goodsDetail',
							params: {
								id: data.id,
								type: '编辑商品'
							}
						});
					}
				});
			},
		}
	}
</script>

<style>
	.goods-list-container {
		background-color: white;
	}

	.layui-hide {
	}

	.layui-table-cell {
		height: 80px;
		line-height: 80px;
	}
</style>
