/*
* @Author: yw850
* @Date:   2017-08-06 01:34:11
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-06 01:40:42
*/

'use strict';
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var CategorySchema = new Schema({
	name: String,
	movies: [{type: ObjectId, ref: 'Movie'}],
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

CategorySchema.pre('save', function(next){
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else{
		this.meta.updateAt = Date.now()
	}
	next()
})

CategorySchema.statics = {
	fetch : function(cb){
		return this.find({}).sort('meta.updateAt').exec(cb)
	},
	findById : function(id, cb){
		return this.findOne({_id: id}).exec(cb)
	}
}

module.exports = CategorySchema