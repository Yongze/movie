/*
* @Author: yw850
* @Date:   2017-08-05 20:25:54
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-05 22:11:12
*/

'use strict';
var Comment = require('../models/comment.js')
var _ = require('underscore')


//admin post movie
exports.save = function(req, res){
	console.log('***********************/admin/comment/********************************')
	var _comment = req.body.comment
	var movieId = _comment.movie


	if (_comment.cid) {
		Comment.findById(_comment.cid, function(err, comment){
			var reply = {
				from: _comment.from,
				to: _comment.tid,
				content: _comment.content
			}
			comment.reply.push(reply)
			comment.save(function(err, comment){
				if (err) {
					console.log(err)
				}
				res.redirect('/movie/' + movieId)
			})
		})
	}else{
		_comment = new Comment(_comment)
		_comment.save(function(err, comment){
			if (err) {
					console.log(err)
			}
			res.redirect('/movie/' + movieId)
		})
	}
}
