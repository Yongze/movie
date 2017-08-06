/*
* @Author: yw850
* @Date:   2017-08-05 15:08:01
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-06 14:39:28
*/

'use strict';
var Movie = require('../models/movie.js')
var Comment = require('../models/comment.js')
var Category = require('../models/category.js')
var _ = require('underscore')
// detail page
exports.detail =  function(req, res){
	var id = req.params.id

	Movie.findById(id, function(err, movie){
		Comment
		.find({movie: id})
		.populate('from', 'name')
		.populate('reply.from reply.to', 'name')
		.exec(function(err, comments){
			console.log('comments:')
			console.log(comments)
			res.render('detail', {
				title: 'imooc ' + movie.title,
				movie: movie,
				comments: comments
			})
		})
	})
}
// admin update movie
exports.update = function(req, res){
	var id = req.params.id

	if (id) {
		Movie.findById(id, function(err, movie){
			Category.find({}, function(err, categories){
				res.render('admin', {
					title: 'imooc admin update',
					movie: movie,
					categories: categories
				})
			})
		})

	}
}

// admin page
exports.movie = function(req, res){
console.log('************************/admin/movie*******************************')
	Category.find({}, function(err, categories){
		res.render('admin', {
			title: 'imooc Admin',
			movie: {},
			categories: categories
		})
	
	})
}
// list page
exports.list = function(req, res){
	Movie.fetch(function(err,movies){
		if (err) {
			console.log(err)
		}
		res.render('list', {
			title: 'imooc List',
			movie: movies
		})
	})
}



//admin post movie
exports.save = function(req, res){
	console.log('***********************/admin/movie/new********************************')
	var id = req.body.movie._id
	var movieObj = req.body.movie
	var _movie
	if (id) {
		Movie.findById(id, function(err, movie){
			if (err) {
				console.log(err)
			}
			_movie = _.extend(movie, movieObj)
			_movie.save(function(err, movie){
				if (err) {
					console.log(err)
				}
				res.redirect('/movie/' + movie._id)
			})
		})
	}else{
		_movie = new Movie(movieObj)

		var categoryID = _movie.category

		_movie.save(function(err, movie){
			if (err) {
					console.log(err)
			}

			Category.findById(categoryID, function(err, category){
				category.movies.push(movie._id)
				category.save(function(err, category){
					res.redirect('/movie/' + movie._id)
				})
			})
		})
	}
}

// list delete movie
exports.del = function(req, res){
	console.log('***********************/admin/list?id=********************************')
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