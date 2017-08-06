/*
* @Author: yw850
* @Date:   2017-08-06 02:02:54
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-07 02:04:17
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
// admin new categories
exports.new = function(req, res){
	res.render('category_admin', {
		title: 'Admin add category',
		category: {

		}
	})
}
//admin new or update categories
exports.save = function(req, res){
	var _category = req.body.category
	
	if (_category._id) {
		Category.findById(_category._id, function(err, cat){
			cat.name = _category.name
			cat.save(function(err, category){
				if (err) {
						console.log(err)
				}
				res.redirect('/admin/category/list')
			})
		})
	}else{
		var category = new Category(_category)
		category.save(function(err, category){
			if (err) {
					console.log(err)
			}
			res.redirect('/admin/category/list')
		})
	}
	
}

// list delete categories
exports.del = function(req, res){
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

/**********************************Add by my own*********************************************/
// admin update categories
exports.update = function(req, res){
	var id = req.params.id

	if (id) {
		Category.findById(id, function(err, category){
			res.render('category_admin', {
				title: 'admin update',
				category: category
			})
		})
	}
}