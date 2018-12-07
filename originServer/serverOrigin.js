var http = require('http')

var url = require('url')

var fs = require('fs')

var path = require('path')

var host = 'localhost'

var port = '333'

var mimeType = {  // 内容类型，一般是指网页中存在的Content-Type，用于定义网络文件的类型和网页的编码，决定浏览器将以什么形式、什么编码读取这个文件
	".html":"text/html",
    ".css":"text/css",
    ".js":"text/javascript"
}

var server = http.createServer(function (req, res) {
  var pathName = url.parse(req.url).pathname // 请求的路由
  
  var realPath = '.' + pathName // unix路径

  var ext = path.extname(realPath) // 文件名后缀

  fs.readFile(realPath, (err, data) => { // 读取文件流
   	if(err){
  	 res.writeHead(404, {'content-type' : 'text/plain'})
  	 res.write('404 not found')
  	 res.end()
  	}else{
  	 res.writeHead(200, { 'content-type': mimeType[ext] || 'text/plain'})
  	 res.write(data) // 文件流写到页面
  	 res.end()
  	}
 })
})

server.listen(port, host, function () {
  console.log('Server is running here: ' + 'http://' + host + ':' + port)
})
