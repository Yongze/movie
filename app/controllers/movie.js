/*
* @Author: yw850
* @Date:   2017-08-05 15:08:01
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-07 00:54:20
*/

'use strict';
var Movie = require('../models/movie.js')
var Comment = require('../models/comment.js')
var Category = require('../models/category.js')
var _ = require('underscore')
var fs = require('fs')
var path = require('path')
// detail page
exports.detail =  function(req, res){
	var id = req.params.id

	Movie.update(
		{_id: id}, 
		{$inc: {pv: 1}},
		function(err){
			console.log(err)
		}
	)
	Movie.findById(id, function(err, movie){
		Comment
		.find({movie: id})
		.populate('from', 'name')
		.populate('reply.from reply.to', 'name')
		.exec(function(err, comments){
			console.log('comments:')
			console.log(comments)
			res.render('detail', {
				title: movie.title,
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
					title: 'admin update',
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
			title: 'Admin',
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
			title: 'List',
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
	if (req.poster) {
		movieObj.poster = req.poster
	}


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

		var categoryID = movieObj.category
		var categoryName = movieObj.categoryName
		
		console.log(movieObj)
		_movie.save(function(err, movie){
			if (err) {
					console.log(err)
			}
			if (categoryID) {
				Category.findById(categoryID, function(err, category){
					category.movies.push(movie._id)
					category.save(function(err, category){
						res.redirect('/movie/' + movie._id)
					})
				})
			}else if(categoryName){
				var category = new Category({
					name: categoryName,
					movies: [movie._id]
				})

				category.save(function(err, category){
					movie.category = category._id
					movie.save(function(err, movie){
						res.redirect('/movie/' + movie._id)
					})
				})
			}
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
// admin poster
exports.savePoster = function(req, res, next){
	var posterData = req.files.uploadPoster
	var filePath = posterData.path
	var originalFilename = posterData.originalFilename


	console.log(req.files)

	if (originalFilename) {
		fs.readFile(filePath, function(err, data){
			var timestamp = Date.now()
			var type = posterData.type.split('/')[1]
			var poster = timestamp + '.' + type
			var newPath = path.join(__dirname, '../../', '/public/upload/' + poster)
			fs.writeFile(newPath, data, function(err){
				req.poster = poster
				next()
			})
		})
	}else{
		next()
	}
}