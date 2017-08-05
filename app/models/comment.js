/*
* @Author: yw850
* @Date:   2017-08-05 20:33:17
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-05 20:35:01
*/

'use strict';
var mongoose = require('mongoose')
var CommentSchema = require('../schemas/comment.js')
var Comment = mongoose.model('Comment', CommentSchema)


module.exports = Comment
// 用过mongoose的model来发布模型