/*
* @Author: yw850
* @Date:   2017-08-06 02:02:54
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-07 00:52:02
*/

'use strict';
var Movie = require('../models/movie.js')
var Category = require('../models/category.js')
var _ = require('underscore')

// categorylist page
exports.list = function(req, res){
	Category.fetch(function(err,categories){
		if (err) {
			console.log(err)
		}
		res.render('categorylist', {
			title: 'category List',
			categories: categories
		})
	})
}
// admin page
exports.new = function(req, res){
console.log('************************/category/new*******************************')
	res.render('category_admin', {
		title: 'Admin add category',
		category: {

		}
	})
}
//admin post movie
exports.save = function(req, res){
	console.log('***********************/admin/category/new********************************')
	var _category = req.body.category
	
	var category = new Category(_category)
	category.save(function(err, movie){
		if (err) {
				console.log(err)
		}
		res.redirect('/admin/category/list')
	})
}

// list delete movie
exports.del = function(req, res){
	console.log('***********************/admin/category?id=********************************')
	var id = req.query.id
	if (id) {
		Movie.remove({_id: id}, function(err, movie){
			if (err) {
				console.log(err)
			}
			else{
				res.json({success: 1})
			}
		})
	}
}