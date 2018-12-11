> 国企车开的就是稳（màn），多了不抱怨了，说事儿。
> 记上次面试经历，谈到跨域，谈到jsonp。因为我们开车稳，所以从不跨域。对于没有实践过jsonp的我来说，要是能讲明白怎么回事，就算是挺能忽悠了。但是功力低微啊，结果就是关公门前耍大刀，赶紧找个时间自己操作一把。

## 服务器环境

node.js

## SPA

html + jquery.js

## 理论知识点

json：JavaScript Object Notation是一种轻量级的数据交换格式。

优点：轻量级，易读eval()转化为实际的对象，传输阶段被压缩，易于机器解析和生成，支持多种语言。

jsonp：Json with Padding是解决跨域问题而提出的一种方案。

原理：由于浏览器同源策略的影响，不允许跨域的请求。而script标签是一个特例，它的src属性可以访问跨域的js，利用这个特性，服务端不再返回json格式的数据，而是返回一段调用某个函数的js代码。在src中调用，达成跨域。

## 注意
- 1.jsonp只支持GET请求。
- 2.localhost和127.0.0.1也是跨域。
- 3.JSONP中的"P"指什么？
- 4.一级域名和二级域名也算跨域。

## 实例解读

### 客户端
通过id="getJsonp"的按钮动态创建script标签，src属性设置为跨域请求的地址，后接参数，即回调函数jsonCallback()。
```
function createScript(src) {
    $("<script><\/script>").attr("src",src).appendTo("body")
}
$("#getJsonp").click(function(){
    createScript("http://127.0.0.1:444/somejson?callback=jsonCallback");
});
```
定义回调函数该干嘛，这里就直接控制台输出跨域请求的结果。
```
function jsonCallback(json) {
    console.log(json)
}
```
### 页面所在的服务端
单纯一个服务，负责模拟一个web服务。

### 跨域请求的服务端
对于发出跨域请求的路由，返回的内容为拼接出的一个完整的函数调用，这个才是关键。
```
var funcName = url.parse(req.url).query.split('&')[0].split("=")[1] // 取到请求传入的回调函数的名称
	
	var data = {
		"name": "MichaelMa",
		"age": 26,
		"isChild": false
	}

	switch (pathName){
		case "/somejson":
			res.writeHead(200, { 'content-type': 'text/plain' })
			res.write(funcName + "(" + JSON.stringify(data) + ")") // 在返回内容中拼接出一个完整的函数调用,效果就是jsonCallback(data)。这行代码是关键。
			break
		default:
			res.writeHead(404, { 'content-type': 'text/plain' })
			res.write("请求错误")
			break
	}
```

### 调试
启动两个服务。一个单纯的web服务`node serverOrigin.js`，一个跨域请求的目标服务`node serverDest.js`。浏览器访问http://localhost:333/jsonpOrigin.html ，打开开发者工具的console项。点击按钮页面上`get JSONP`按钮，console内输出跨域请求的数据。

### 总结
至此完整的jsonp流程理顺了下来，还有jquery ajax封装的jsonp。原理也是一样的。希望以后项目中用到时，自己能得心应手。get it！
