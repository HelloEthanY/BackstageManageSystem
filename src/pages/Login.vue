<template>
	<div class="login-wapper">
		<div class="login-content">
			<form class="layui-form form-content">
				<div class="layui-form-item">
					<label class="layui-form-label">用户名:</label>
					<div class="layui-input-inline">
						<input type="text" id="input-name" lay-verify="required" placeholder="请输入用户名" autocomplete="off" class="layui-input">
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">密码:</label>
					<div class="layui-input-inline">
						<input type="password" id="input-password" lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input">
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">验证码:</label>
					<div class="layui-input-inline">
						<input type="text" id="input-code" style="width: 135px;" placeholder="请输入验证码" autocomplete="off" class="layui-input">
					</div>
					<div class="layui-input-inline" style="width: 100px;height: 38px;background-color: white;border-radius: 2px;margin-left: -60px;">
						<canvas id="canvas"></canvas>
					</div>
				</div>
				<div class="layui-form-item">
					<div class="layui-input-block">
						<button type="submit" class="layui-btn btn-login" lay-submit="" lay-filter="demo1">登陆</button>
						<button type="reset" class="layui-btn layui-btn-primary btn-resgiter">
							<router-link to="/registered">注册</router-link>
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	// 验证码展示内容
	var show_num = [];
	// 弹层
	var layer;

	export default {
		name: 'login',
		data() {
			return {

			}
		},
		mounted: function() {
			var _this = this;
			$('.login-wapper').width($(window).width());
			$('.login-wapper').height($(window).height());
			// 使用layui设置数据
			layui.use(['layer'], function() {
				layer = layui.layer; //弹层
				// 加载登陆验证码和视图
				_this.loadLoginView();
			});
		},
		methods: {
			loadLoginView() {
				var _this = this;
				// 绘制验证码
				_this.draw(show_num);
				// 验证码画布的点击事件
				$("#canvas").on('click', function() {
					// 绘制验证码
					_this.draw(show_num);
				})
				// 登陆按钮的点击事件
				$(".btn-login").on('click', function() {
					layer.load(1);
					// 获取输入的验证码
					var val = $("#input-code").val().toLowerCase();
					// 获取用户名
					var userName = $('#input-name').val();
					// 获取密码
					var userPassword = $('#input-password').val();
					// 获取绘制的验证码
					var num = show_num.join("");
					if (val == '') {
						// 关于加载框
						setTimeout(function() {
							layer.closeAll('loading');
						}, 0);
						// 显示弹出框
						layer.msg("请输入验证码！", function() {
							//此处演示关闭	
						});
					} else if (val == num) {
						if (userName == '') { // 用户名为空
							layer.msg("用户名不能为空！", function() {});
							$(".input-val").val('');
							_this.draw(show_num);
							return;
						} else if (userPassword == '') { // 密码为空
							layer.msg("密码不能为空！", function() {});
							$(".input-val").val('');
							_this.draw(show_num);
							return;
						} else { // 用户名和密码都不为空 进行网络请求
							setTimeout(function() {
								layer.closeAll('loading');

							}, 10);
							layer.msg("登陆成功！")
							_this.$router.push({
								path: '/home'
							});
							/* $.ajax({
								type: "post",
								url: "",
								async: true,
								data: {
									userName: userName,
									password: userPassword
								},
								headers: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								dataType: 'json'
							}).success(function(res) {
								// layer.msg("登陆成功", function() {});
							}).error(function(res) {

								// window.location.href = "index.html";

							}); */
						}
					} else {
						// 挂于加载框
						setTimeout(function() {
							layer.closeAll('loading');
						}, 0);
						// 显示弹出框
						layer.msg("验证码错误！请重新输入！", function() {
							//此处弹出框关闭，并重新刷新验证码

						});
						$(".input-val").val('');
						_this.draw(show_num);
						// alert('验证码错误！请重新输入！');
						console.log("验证码错误！请重新输入！");
					}
				});
				// 点击注册
				/* $('.btn-resgiter').on('click', function() {
					window.location.href = "index.html";
				}) */
			},
			// 绘制验证码
			draw(show_num) {
				var _this = this;
				var canvas_width = $('#canvas').width();
				var canvas_height = $('#canvas').height();
				var canvas = document.getElementById("canvas"); //获取到canvas的对象，演员
				var context = canvas.getContext("2d"); //获取到canvas画图的环境，演员表演的舞台
				canvas.width = canvas_width;
				canvas.height = canvas_height;
				var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
				var aCode = sCode.split(",");
				var aLength = aCode.length; //获取到数组的长度

				for (var i = 0; i <= 3; i++) {
					var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
					var deg = Math.random() * 30 * Math.PI / 180; //产生0~30之间的随机弧度
					var txt = aCode[j]; //得到随机的一个内容
					show_num[i] = txt.toLowerCase();
					var x = 10 + i * 20; //文字在canvas上的x坐标
					var y = 20 + Math.random() * 8; //文字在canvas上的y坐标
					context.font = "bold 23px 微软雅黑";
					context.translate(x, y);
					context.rotate(deg);
					context.fillStyle = _this.randomColor();
					context.fillText(txt, 0, 0);
					context.rotate(-deg);
					context.translate(-x, -y);
				}
				for (var i = 0; i <= 5; i++) { //验证码上显示线条
					context.strokeStyle = _this.randomColor();
					context.beginPath();
					context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
					context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
					context.stroke();
				}
				for (var i = 0; i <= 30; i++) { //验证码上显示小点
					context.strokeStyle = _this.randomColor();
					context.beginPath();
					var x = Math.random() * canvas_width;
					var y = Math.random() * canvas_height;
					context.moveTo(x, y);
					context.lineTo(x + 1, y + 1);
					context.stroke();
				}
			},
			// 得到验证码颜色
			randomColor() { //得到随机的颜色值
				var r = Math.floor(Math.random() * 256);
				var g = Math.floor(Math.random() * 256);
				var b = Math.floor(Math.random() * 256);
				return "rgb(" + r + "," + g + "," + b + ")";
			}
		}
	}
</script>

<style>
	.login-wapper {
		width: 100%;
		height: 100%;
		background-color: #009F95;
	}

	.login-content {
		width: 440px;
		border-radius: 10px;
		position: absolute;
		height: 260px;
		bottom: 20px;
		background-color: rgba(0, 0, 0, 0.4);
		display: table;
		vertical-align: middle;
		text-align: center;
		right: 20px;
	}

	.form-content {
		position: relative;
		top: 35px;
		width: 400px;
		display: inline-block;
		margin: 0 auto;
	}

	.layui-form-label {
		color: white;
	}

	.layui-input {
		width: 240px;
	}

	#canvas {
		float: right;
		display: inline-block;
		cursor: pointer;
		width: 100px;
		height: 38px;
	}
</style>
