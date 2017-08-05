/*
* @Author: yw850
* @Date:   2017-08-05 20:12:20
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-05 22:13:46
*/

'use strict';
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var CommmentSchema = new Schema({
	movie: {
		type: ObjectId,
		ref: 'Movie'//module, 通过populate方法
	},
	from: {
		type: ObjectId,
		ref: 'User'//module
	},
	reply:[{
		to: {
			type: ObjectId,
			ref: 'User'//module
		},
		from: {
			type: ObjectId,
			ref: 'User'//module
		},
		content: String
	}],
	content: String,
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

CommmentSchema.pre('save', function(next){
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else{
		this.meta.updateAt = Date.now()
	}
	next()
})

CommmentSchema.statics = {
	fetch : function(cb){
		return this.find({}).sort('meta.updateAt').exec(cb)
	},
	findById : function(id, cb){
		return this.findOne({_id: id}).exec(cb)
	}
}

module.exports = CommmentSchema