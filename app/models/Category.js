/*
* @Author: yw850
* @Date:   2017-08-06 01:45:08
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-06 01:46:02
*/

'use strict';
var mongoose = require('mongoose')
var CategorySchema = require('../schemas/category.js')
var Category = mongoose.model('Category', CategorySchema)


module.exports = Category
// 用过mongoose的model来发布模型