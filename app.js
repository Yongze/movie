/*
* @Author: yw850
* @Date:   2017-07-31 21:16:07
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-07 17:59:08
*/

'use strict';
var express = require('express')
var port = process.env.PORT || 3000
var app = express()
var cookieParser = require('cookie-parser')
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)
var logger = require('morgan')
var serveStatic = require('serve-static')
var bodyParser = require('body-parser')

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


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
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

console.log('env:')
var env = process.env.NODE_ENV || 'development'
console.log('|' + env + '|')
if ('development' === env) {
	// 屏幕上打印错误信息
	app.set('showStackError', true)
	// 'dev' 
	app.use(logger(':method :url :status'))
	// 页面源码格式化后的，而不是压缩
	app.locals.pretty = true
	// 通过mongoose debug
	mongoose.set('debug', true)
}

require('./config/routes.js')(app)
app.listen(port)
console.log('imooc start on port ' + port)