/*
* @Author: yw850
* @Date:   2017-07-31 21:16:07
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-02 23:37:30
*/

'use strict';
var express = require('express')
var port = process.env.PORT || 3000
var app = express()
// var path = require('path')
var mongoose = require('mongoose')
var Movie = require('./models/movie.js')
var _ = require('underscore')

mongoose.connect('mongodb://localhost/imooc')

app.set('views','./views/pages')
app.set('view engine', 'jade')
app.use(express.bodyParser())
app.use(express.static('public'))
app.listen(port)
console.log('imooc start on port ' + port)

// index page
app.get('/', function(req, res){
	Movie.fetch(function(err,movies){
		if (err) {
			console.log(err)
		}
		res.render('index', {
			title: 'imooc Home',
			movie: movies
		})
	})
})
// detail page
app.get('/movie/:id', function(req, res){
	var id = req.params.id

	Movie.findById(id, function(err, movie){
		res.render('detail', {
			title: 'imooc ' + movie.title,
			movie: movie
		})
	})
})
// admin update movie
app.get('/admin/update/:id', function(req, res){
	var id = req.params.id

	if (id) {
		Movie.findById(id, function(err, movie){
			res.render('admin', {
				title: 'imooc admin update',
				movie: movie 
			})
		})

	}
})

// admin page
app.get('/admin/movie', function(req, res){
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
})
// list page
app.get('/admin/list', function(req, res){
	Movie.fetch(function(err,movies){
		if (err) {
			console.log(err)
		}
		res.render('list', {
			title: 'imooc List',
			movie: movies
		})
	})
})

//admin post movie
app.post('/admin/movie/new', function(req, res){
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
})

// list delete movie
app.delete('/admin/list', function(req, res){
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
})