/*
* @Author: yw850
* @Date:   2017-08-03 21:28:14
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-07 17:59:33
*/

'use strict';
var Index = require('../app/controllers/index.js')
var User = require('../app/controllers/user.js')
var Movie = require('../app/controllers/movie.js')
var Comment = require('../app/controllers/comment.js')
var Category = require('../app/controllers/category.js')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
module.exports = function(app){
	// pre handle user
	app.use(function(req, res, next){
		var _user = req.session.user
		// 放入locals，这样在渲染jade是可以直接读出
		app.locals.user = _user
		next()	
	})

	// Index 
	app.get('/', Index.index)
	// User
	app.post('/user/signup', User.signup)
	app.post('/user/signin', User.signin)
	app.get('/logout', User.logout)
	app.get('/signin', User.shouldSignin)
	app.get('/signup', User.shouldSignup)
	app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list)

	// Movie
	app.get('/movie/:id', Movie.detail)
	app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update)
	app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.movie)
	app.post('/admin/movie', multipartMiddleware, User.signinRequired, User.adminRequired, Movie.savePoster, Movie.save)
	app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list)
	app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.del)


	// comment
	app.post('/admin/comment', User.signinRequired, Comment.save)

	// category
	app.get('/admin/category/new', User.signinRequired, User.adminRequired, Category.new)
	app.post('/admin/category/save', User.signinRequired, User.adminRequired, Category.save)
	app.get('/admin/category/list', User.signinRequired, User.adminRequired, Category.list)
	// self-defined
	app.get('/admin/category/update/:id', User.signinRequired, User.adminRequired, Category.update)


	// result
	app.get('/results', Index.search)
}
