/*
* @Author: yw850
* @Date:   2017-08-01 00:01:31
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-08 20:01:24
*/

'use strict';
var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId
var MovieSchema = new mongoose.Schema({
	doctor: String,
	title: String,
	language: String,
	country: String,
	summary: String,
	flash: String,
	poster: String,
	year: String,
	pv: {
		type: Number,
		default: 0
	},
	category: {
		type: ObjectId,
		ref: 'Category'
	},
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})

MovieSchema.pre('save', function(next){
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else{
		this.meta.updateAt = Date.now()
	}
	next()
})

MovieSchema.statics = {
	fetch : function(cb){
		return this.find({}).sort('meta.updateAt').exec(cb)
	},
	findById : function(id, cb){
		return this.findOne({_id: id}).exec(cb)
	}
}

module.exports = MovieSchema