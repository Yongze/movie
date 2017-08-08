/*
* @Author: yw850
* @Date:   2017-08-05 15:01:07
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-08 22:46:34
*/

'use strict';
var Movie = require('../models/movie.js')
var Category = require('../models/category.js')
var count = 2
// index page
exports.index = function(req, res){
	Category
	.find({})
	.populate({path: 'movies', options: {limit: 6}})
	.exec(function(err, categories){
		if (err) {
			console.log(err)
		}
		res.render('index', {
			title: 'Home',
			categories: categories
		})
	})
}
/* 
		the pagination of mongodb is fine in my pc
		but not in video, so demo video is going to use
		self-defined pagination machnisim
		the code commented off works fine
*/
// search page
// exports.search = function(req, res){
// 	var catId = req.query.cat
// 	var page = req.query.p
// 	var index = page * count


// 	Category
// 	.find({
// 		_id: catId
// 	})
// 	.populate({
// 		path: 'movies', 
// 		select: 'title poster',
// 		options: {
// 			limit: count, 
// 			skip: index
// 		}
// 	})
// 	.exec(function(err, categories){
// 		if (err) {
// 			console.log(err)
// 		}
// 		var category = categories[0] || {}
// 		res.render('results', {
// 			title: 'result list',
// 			cat: category,
// 			keyword: category.name
// 		})
// 	})
// }
// search page
exports.search = function(req, res){
	var catId = req.query.cat
	var page = parseInt(req.query.p, 10) || 0
	var index = page * count
	var q = req.query.q

	if (catId) {
		Category
		.find({
			_id: catId
		})
		.populate({
			path: 'movies',
			select: 'title poster'
		})
		.exec(function(err, categories){
			if (err) {
				console.log(err)
			}
			var category = categories[0] || {}


			var movies = category.movies || []
			var results = movies.slice(index, index + count)




			res.render('results', {
				title: 'result list',
				keyword: 'Category: ' + category.name.toUpperCase(),
				currentPage: (page + 1),
				totalPage: Math.ceil(movies.length / count),//向上进位
				movies: results,
				query: 'cat=' + catId
			})
		})	
	}else{
		Movie
		.find({
			title: new RegExp(q + '.*', 'i')  // /q/	//正则模糊匹配
		})
		.exec(function(err, movies){
			if (err) {
				console.log(err)
			}
			var results = movies.slice(index, index + count)
			res.render('results', {
				title: 'result list',
				currentPage: (page + 1),
				totalPage: Math.ceil(movies.length / count),//向上进位
				movies: results,
				query: 'q=' + q,
				keyword: q
			})
		})
	}
}

