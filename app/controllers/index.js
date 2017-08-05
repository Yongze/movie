/*
* @Author: yw850
* @Date:   2017-08-05 15:01:07
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-05 15:15:49
*/

'use strict';
var Movie = require('../models/movie.js')
// index page
exports.index = function(req, res){
	console.log("user in session: ")
	console.log(req.session.user)

	Movie.fetch(function(err,movies){
		if (err) {
			console.log(err)
		}
		res.render('index', {
			title: 'imooc Home',
			movie: movies
		})
	})
}

