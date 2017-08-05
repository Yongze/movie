/*
* @Author: yw850
* @Date:   2017-08-05 15:03:18
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-05 19:46:23
*/

'use strict';
var User = require('../models/user.js')

// userlist page
exports.shouldSignup = function(req, res){
	res.render('signup', {
		title: 'Sign up'
	})
}
exports.shouldSignin = function(req, res){
	res.render('signin', {
		title: 'Sign in'
	})
}


// sign up
exports.signup = function(req, res){
	var _user = req.body.user

	User.find({name:_user.name}, function(err, user){
		if (err) {
			console.log(err)
		}
		if (user) {
			return res.redirect('/signin')
		}else{
			var user = new User(_user)
			user.save(function(err, user){
				if (err) {
					console.log(err)
				}
				res.redirect('/')
			})
		}
	})
	

	// /user/signup/:userid
	// var _userid = req.params.userid
	// /user/signup/1111?userid=1112
	// var _userid = req.query.userid
	// var _user = req.param('user')
	
}
// sign in
exports.signin = function(req, res){
	var _user = req.body.user
	var name = _user.name
	var password = _user.password
	User.findOne({name: name}, function(err, user){
		if (err) {
			console.log(err)
		}
		if (!user) {
			return res.redirect('/signup')
		}
		user.comparePassword(password, function(err, isMatch){
			if (err) {
				console.log(err)
			}
			if (isMatch) {
				req.session.user = user
				console.log('Password is matched')
				return res.redirect('/')
			}
			else{
				console.log('Password is not matched')
				return res.redirect('/signin')
			}
		})
	})
}

exports.logout = function(req, res){
	delete req.session.user
	// delete app.locals.user
	res.redirect('/')
}
// userlist page
exports.list = function(req, res){
	User.fetch(function(err,users){
		if (err) {
			console.log(err)
		}
		res.render('userlist', {
			title: 'imooc User List',
			users: users
		})
	})
}
// middleware for user
exports.signinRequired = function(req, res, next){
	var user = req.session.user
	if (!user) {
		return res.redirect('/signin')
	}

	next()
}
// middleware for user
exports.adminRequired = function(req, res, next){
	var user = req.session.user
	if (user.role <= 10) {
		return res.redirect('/signin')
	}

	next()
}