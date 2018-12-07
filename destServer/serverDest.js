var http = require('http')

var url = require('url')

var fs = require('fs')

var path = require('path')

var host = 'localhost'

var port = '444'

var server = http.createServer(function (req, res) {
	
	var pathName = url.parse(req.url).pathname // 请求的路由

	console.log(url.parse(req.url).query.split("=")[1]) // Get请求参数处理
	
	var funcName = url.parse(req.url).query.split('&')[0].split("=")[1] // 取到请求传入的回调函数的名称
	
	var data = {
		"name": "MichaelMa",
		"age": 26,
		"isChild": false
	}

	switch (pathName){
		case "/somejson":
			res.writeHead(200, { 'content-type': 'text/plain' })
			res.write(funcName + "(" + JSON.stringify(data) + ")") // 在返回内容中拼接出一个完整的函数调用,效果就是jsonCallback(data)
			break
		default:
			res.writeHead(404, { 'content-type': 'text/plain' })
			res.write("请求错误")
			break
	}
	
	res.end()

})

server.listen(port, host, function () {
  console.log('Server is running here: ' + 'http://' + host + ':' + port)
})
