/*
* @Author: yw850
* @Date:   2017-08-05 15:08:01
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-05 15:15:48
*/

'use strict';
var Movie = require('../models/movie.js')
var _ = require('underscore')
// detail page
exports.detail =  function(req, res){
	var id = req.params.id

	Movie.findById(id, function(err, movie){
		res.render('detail', {
			title: 'imooc ' + movie.title,
			movie: movie
		})
	})
}
// admin update movie
exports.update = function(req, res){
	var id = req.params.id

	if (id) {
		Movie.findById(id, function(err, movie){
			res.render('admin', {
				title: 'imooc admin update',
				movie: movie 
			})
		})

	}
}

// admin page
exports.movie = function(req, res){
console.log('************************/admin/movie*******************************')
	res.render('admin', {
		title: 'imooc Admin',
		movie: {
			title: '',
			doctor: '',
			country: '',
			year: '',
			poster: '',
			flash: '',
			summary: '',
			language: ''
		}
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
	if (id !== 'undefined') {
		Movie.findById(id, function(err, movie){
			if (err) {
				console.log(err)
			}
			_movie = _.extend(movie, movieObj)
			_movie.save(function(err, movie){
				if (err) {
					console.log(err)
				}
				res.redirect('movie/' + movie._id)
			})
		})
	}else{
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			country: movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			poster: movieObj.poster,
			summary: movieObj.summary,
			flash: movieObj.flash
		})
		_movie.save(function(err, movie){
			if (err) {
					console.log(err)
			}
			res.redirect('movie/' + movie._id)
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