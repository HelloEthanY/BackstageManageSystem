function getBaseUrl(str) {
	var baseUrl = "https://x.xgaircraft.cn:8032" //测试
	// var ajaxurl = "http://112.80.39.92:8018/webservices/rest.php?version=1.1"//生产
	switch (str) {
		case "testBaseUrl":
			return baseUrl;
			break;
		case "baseUrl":
			return baseUrl;
			break
	}
}

//暴露的方法
//公开的方法
export default {
	getBaseUrl: getBaseUrl, //获取 公共配置方法
}
