/*
* @Author: yw850
* @Date:   2017-07-31 21:16:07
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-07 16:08:51
*/

'use strict';
var express = require('express')
var port = process.env.PORT || 3000
var app = express()
/*****************************express@4.x upgrade**************************************/
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
// move multiparty to route.js
// var multiparty = require('connect-multiparty')
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)
var logger = require('morgan')
var serveStatic = require('serve-static')
/*****************************express@4.x upgrade**************************************/
var mongoose = require('mongoose')

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
app.locals.moment = require('moment')


/*****************************express@4.x upgrade**************************************/
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieParser())

app.use(session({
	secret: 'imooc',
	store : new mongoStore({
		url: dbUrl,
		connection: 'sessions'
	}),
	resave: false,
	saveUninitialized: true,
	// cookie: { secure: true }
}))
app.use(serveStatic('public'))
/*****************************express@3.x**************************************/
// 中间件能见post的内容初始化成一个对象
// app.use(express.bodyParser())
// app.use(express.cookieParser())
// app.use(express.multipart())
// app.use(express.session({
// 	secret: 'imooc',
// 	store : new mongoStore({
// 		url: dbUrl,
// 		connection: 'sessions'
// 	})
// }))
// var mongoStore = require('connect-mongo')(express)
// app.use(express.static('public'))

console.log('env:')
// console.log('|' + app.get('env') + '|')
var env = process.env.NODE_ENV || 'development'
console.log('|' + env + '|')
if ('development' === env) {
	// 屏幕上打印错误信息
	app.set('showStackError', true)
	// 'dev' 
	/*****************************express@3.x**************************************/
	// app.use(express.logger(':method :url :status'))
	/*****************************express@3.x**************************************/
	/*****************************express@4.x upgrade**************************************/
	app.use(logger(':method :url :status'))
	/*****************************express@4.x upgrade**************************************/
	// 页面源码格式化后的，而不是压缩
	app.locals.pretty = true
	// 通过mongoose debug
	mongoose.set('debug', true)
}

require('./config/routes.js')(app)
app.listen(port)
console.log('imooc start on port ' + port)



