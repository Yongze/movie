/*
* @Author: yw850
* @Date:   2017-07-31 21:16:07
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-06 23:08:59
*/

'use strict';
var express = require('express')
var port = process.env.PORT || 3000
var app = express()
// var path = require('path')
var mongoose = require('mongoose')
var mongoStore = require('connect-mongo')(express)

var dbUrl = 'mongodb://localhost/imooc'
mongoose.connect(dbUrl)
var fs = require('fs')
var models_path = __dirname + '/app/models'
var walk = function (path) {
	fs
	.readdirSync(path)
	.forEach(function(file){
		var newPath = path + '/' + file
		var stat = fs.statSync(newPath)
		if (stat.isFile()) {
			if (/(.*)\.(js|coffee)/.test(file)) {
				require(newPath)
			}
		}
		else if (stat.isDirectory()) {
			walk(newPath)
		}
	})
}
walk(models_path)


app.set('views','./app/views/pages')
app.set('view engine', 'jade')
// 中间件能见post的内容初始化成一个对象
app.use(express.bodyParser())
app.use(express.static('public'))
app.locals.moment = require('moment')
app.use(express.cookieParser())
app.use(express.multipart())
app.use(express.session({
	secret: 'imooc',
	store : new mongoStore({
		url: dbUrl,
		connection: 'sessions'
	})
}))

if ('development' === app.get('env')) {
	// 屏幕上打印错误信息
	app.set('showStackError', true)
	// 'dev' 
	app.use(express.logger(':method :url :status'))
	// 页面源码格式化后的，而不是压缩
	app.locals.pretty = true
	// 通过mongoose debug
	mongoose.set('debug', true)
}

require('./config/routes.js')(app)
app.listen(port)
console.log('imooc start on port ' + port)



