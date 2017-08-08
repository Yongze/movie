/*
* @Author: yw850
* @Date:   2017-08-05 15:03:18
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-08 18:55:49
*/

'use strict';
var User = require('../models/user.js')
var MSG_account_existed = 'Sorry, the user name has existed in our system.'
var MSG_permisstion = 'Permisstion deny, please login as an admin.'
var MSG_permisstion_super = 'Permisstion deny, please login as a super admin.'
var MSG_success_register = 'Congrats! Your account has created. Sign in here'
var MSG_signin_fail = "Sorry, your user name doesn't exist. Please signup or relogin again."
var MSG_wrong_pass = "Sorry, your password is incorrect. Please sign in again."

// userlist page
exports.shouldSignup = function(req, res){
	res.render('signup', {
		title: 'Sign up'
	})
}
exports.shouldSignin = function(req, res){
	var msg = req.query.msg
	var type = req.query.type
	console.log('req.query')
	console.log(req.query)
	res.render('signin', {
		title: 'Sign in',
		msg: msg,
		type: type
	})
}


// sign up
exports.signup = function(req, res){
	var _user = req.body.user

	User.findOne({name:_user.name}, function(err, user){
		if (err) {
			console.log(err)
		}
		if (user) {
			return res.redirect('/signin?type=danger&msg=' + MSG_account_existed)
		}else{
			var user = new User(_user)
			user.save(function(err, user){
				if (err) {
					console.log(err)
				}
				res.redirect('/signin?type=success&msg=' + MSG_success_register)
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
			return res.redirect('/signin?type=warning&msg=' + MSG_signin_fail)
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
				return res.redirect('/signin?type=warning&msg=' + MSG_wrong_pass)
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
			title: 'User List',
			users: users,
			userId: req.session.user._id
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
		return res.redirect('/signin?type=danger&msg=' + MSG_permisstion)
	}

	next()
}
// middleware for user
exports.superAdminRequired = function(req, res, next){
	var user = req.session.user
	if (user.role <= 50 ) {
		return res.redirect('/signin?type=danger&msg=' + MSG_permisstion_super)
	}

	next()
}
// admin update user name
// super admin update username and user role
exports.update = function(req, res){
	var id = req.params.id

	if (id) {
		User.findById(id, function(err, record){
			res.render('user_update', {
				title: 'user update',
				record: record,
				role: req.session.user.role
			})
		})
	}
}
// Super admin delete user
exports.del = function(req, res){
	var id = req.query.id
	if (id) {
		User.remove({_id: id}, function(err, user){
			if (err) {
				console.log(err)
			}
			else{
				res.json({success: 1})
			}
		})
	}
}
//admin update user
exports.save = function(req, res){
	var _user = req.body.user
	console.log('_user')
	console.log(_user)

	User.findById(_user._id, function(err, user){
		user.name = _user.name
		user.role = _user.role
		user.save(function(err, user){
			if (err) {
					console.log(err)
			}
			res.redirect('/admin/user/list')
		})
	})
	
	
}