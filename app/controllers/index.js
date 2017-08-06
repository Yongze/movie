/*
* @Author: yw850
* @Date:   2017-08-05 15:01:07
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-06 12:09:49
*/

'use strict';
var Movie = require('../models/movie.js')
var Category = require('../models/category.js')
// index page
exports.index = function(req, res){
	Category
	.find({})
	.populate({path: 'movies', options: {limit: 5}})
	.exec(function(err, categories){
		if (err) {
			console.log(err)
		}
		res.render('index', {
			title: 'imooc Home',
			categories: categories
		})
	})
}

