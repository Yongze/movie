/*
* @Author: yw850
* @Date:   2017-08-01 00:10:59
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-01 00:13:08
*/

'use strict';
var mongoose = require('mongoose')
var MovieSchema = require('../schemas/movie.js')
var Movie = mongoose.model('Movie', MovieSchema)


module.exports = Movie