<!-- 编辑商品 -->
<template>
	<div class="goods-editor-container">
		<fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;text-align: left;">
			<legend>{{type}}</legend>
		</fieldset>
		<form class="layui-form" action="" lay-filter="example">
			<div class="layui-form-item">
				<label class="layui-form-label">商品名称:</label>
				<div class="layui-input-block">
					<input type="text" name="shopname" lay-verify="title" placeholder="请输入商品名称" autocomplete="off" class="layui-input">
				</div>
			</div>

			<div class="layui-form-item">
				<label class="layui-form-label">商品简介:</label>
				<div class="layui-input-block">
					<textarea class="layui-textarea" name="shopintroduce" autocomplete="off" placeholder="请输入商品简介" lay-verify="content"></textarea>
				</div>
			</div>
			<div class="layui-form-item">
				<div class="layui-inline">
					<label class="layui-form-label">现价:</label>
					<div class="layui-input-inline">
						<input placeholder="请输入现价" name="price" autocomplete="off" class="layui-input" type="text" />
					</div>
					<div class="layui-form-mid layui-word-aux">元</div>
				</div>
				<div class="layui-inline">
					<label class="layui-form-label">原价:</label>
					<div class="layui-input-inline">
						<input type="text" placeholder="请输入原价" autocomplete="off" name="oldPirce" class="layui-input" />
					</div>
					<div class="layui-form-mid layui-word-aux">元</div>
				</div>
			</div>
			<div class="layui-form-item">
				<div class="layui-inline">
					<label class="layui-form-label" style="margin-top: 5px;">商品规格:</label>
					<div class="layui-input-block specification-info">

					</div>
				</div>
				<div class="layui-inline">
					<div class="layui-input-block">
						<input type="button" class="layui-btn" v-if="this.$route.params.type!='查看商品'" v-on:click="onClickAddSpecificationItem()"
						 value="添加规格"></input>
					</div>
				</div>
			</div>
			<!--上传商品logo图片-->
			<div class="layui-form-item">
				<label class="layui-form-label">商品logo</label>
				<div class="layui-upload">
					<button type="button" v-if="this.$route.params.type!='查看商品'" class="layui-btn" id="test1">选择商品logo</button>
					<blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;margin-left: 110px;">
						logo 预览图：
						<div class="layui-upload-list">
							<img class="layui-upload-img" onclick="showBigImage()" style="width: 160px;" id="demo1">
							<p id="demoText"></p>
						</div>
					</blockquote>
				</div>
			</div>
			<!--上传商品图片-->
			<div class="layui-form-item">
				<blockquote class="layui-form-label">商品图片</blockquote>
				<div class="layui-upload">
					<button type="button" v-if="this.$route.params.type!='查看商品'" class="layui-btn" id="test2">选择商品图片</button>
					<blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;margin-left: 110px;">
						商品预览图：
						<div class="layui-upload-list" id="demo2"></div>
					</blockquote>
				</div>
			</div>
		</form>
		<div class="layui-form-item">
			<div class="layui-input-block">
				<button type="submit" v-if="this.$route.params.type!='查看商品'" class="layui-btn" lay-submit="" id="onSubmit"
				 lay-filter="demo1">立即提交</button>
				<button class="layui-btn" v-on:click="black">返回</button>
			</div>
		</div>
	</div>
</template>

<script>
	var layer;
	var form;

	export default {
		name: 'goodsEditor',
		data() {
			return {
				type: '新增商品',
				content: '长输入框',
				baseUrl: this.$getMyConfig.getBaseUrl("baseUrl"),
				goodsId: null,
			}
		},
		mounted() {
			var _this = this;
			if (_this.$route.params.type != undefined) {
				_this.type = _this.$route.params.type;
				_this.goodsId = _this.$route.params.id;
			}
			layui.use(['layer', 'form', 'upload'], function() {
				var $ = layui.jquery;
				var upload = layui.upload;
				layer = layui.layer;
				form = layui.form;
				//普通图片上传
				var uploadInst = upload.render({
					elem: '#test1',
					url: '/upload/',
					before: function(obj) {
						//预读本地文件示例，不支持ie8
						obj.preview(function(index, file, result) {
							$('#demo1').attr('src', result); //图片链接（base64）
						});
					},
					done: function(res) {
						//如果上传失败
						if (res.code > 0) {
							return layer.msg('上传失败');
						}
						//上传成功
					},
					error: function() {
						//演示失败状态，并实现重传
						/* 	var demoText = $('#demoText');
							demoText.html(
								'<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
							demoText.find('.demo-reload').on('click', function() {
								uploadInst.upload();
							}); */
					}
				});

				//多图片上传
				upload.render({
					elem: '#test2',
					url: '/upload/',
					multiple: true,
					before: function(obj) {
						//预读本地文件示例，不支持ie8
						obj.preview(function(index, file, result) {
							$('#demo2').append('<img src="' + result + '" alt="' + file.name + '" class="layui-upload-img">')
						});
					},
					done: function(res) {
						//上传完毕
					}
				});

				//表单取值
				layui.$('#onSubmit').on('click', function() {
					var data = form.val('example');
					console.log("提交按钮呗点击了" + JSON.stringify(data));
				});
				// 请求数据
				if (_this.goodsId != null) {
					_this.loadShopInfoData();
				}
			});
		},

		methods: {
			// 点击返回上一层
			black() {
				this.$router.go(-1);
			},
			// 点击添加商品规格
			onClickAddSpecificationItem() {
				var itemContent = $('<div class="layui-input-inline" style="margin-top: 5px;"> </div>');
				var specificationItem = itemContent.append(
					'<input type="text" placeholder="请输入规格" autocomplete="off" name="oldPirce" class="layui-input" />');
				$('.specification-info').append(specificationItem);
			},
			// 请求商品详情数据
			loadShopInfoData() {
				var _this = this;
				$.ajax({
					type: "post",
					url: _this.baseUrl + "/mobile/goods/QueryGoodsDetail",
					async: true,
					data: {
						userId: "oKmuX5JNZaW3E58hjW86-W6VeHhU",
						id: _this.goodsId
					},
					dataType: 'json',
					headers: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: function(res) {
						console.log(JSON.stringify(res));
						if (res.code == 200 && res.result != null) {
							// 展示商品图片
							_this.showShopImage(res.result.imgList);
							// 商品详情内容
							_this.showShopInfo(res.result.goods);
							// 展示规格内容
							_this.showShopSpecificationInfo(res.result.sizeList);
						}
					},
					error: function(error) {
						console.log("res:" + JSON.stringify(error));
					}
				});
			},
			// 展示商品图片
			showShopImage(imgList) {
				var _this = this;
				for (var i = 0; i < imgList.length; i++) {
					$('#demo2').append('<img style="width: 160px;margin-right: 10px;" src="' + _this.baseUrl + imgList[i].imgPath +
						'" alt="' + imgList[i].imgName + '" class="layui-upload-img">');
				}
			},
			// 商品详情内容
			showShopInfo(goodsDetail) {
				var _this = this;
				$('#demo1').attr('src', _this.baseUrl + goodsDetail.showImg); //图片链接（base64）
				//表单赋值
				form.val('example', {
					"shopname": goodsDetail.subTitle, // "name": "value"
					"price": goodsDetail.price,
					"oldPirce": goodsDetail.oldPrice,
					"shopintroduce": goodsDetail.detail
				});
			},
			// 展示规格内容
			showShopSpecificationInfo(specificationDetail) {
				var _this = this;
				for (var i = 0; i < specificationDetail.length; i++) {
					var itemContent = $('<div class="layui-input-inline" style="margin-top: 5px;"> </div>');
					var specificationItem = itemContent.append('<input type="text" placeholder="请输入规格" autocomplete="off" value="' +
						specificationDetail[i].proSizeName + '" name="oldPirce" class="layui-input" />');
					$('.specification-info').append(specificationItem);
				}
			}
		}
	}
</script>

<style>
	.goods-editor-container {
		color: #000000;
		text-align: left;
	}

	.layui-form-label {
		color: #000000;
	}

	.layui-form {
		margin-right: 10px;
		text-align: left;
		color: #000000;
	}

	.layui-input {
		margin-right: 10px;
	}
</style>
