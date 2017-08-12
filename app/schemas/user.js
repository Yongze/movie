/*
* @Author: yw850
* @Date:   2017-08-03 13:35:04
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-12 13:50:28
*/

'use strict';
var SALT_WORK_FACTOR = 10
var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var UserSchema = new mongoose.Schema({
	name:{
		unique: true,
		type: String
	},
	password:String,
	// user
	// admin
	// super admin
	// role: String,
	// 0: normal
	// 1: verified user
	// 2: professional user
	// > 10: admin
	// > 50: super admin
	role: {
		type: Number,
		default: 0
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
	},
})

UserSchema.pre('save', function(next){
	var user = this
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
		bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
			if (err) {
				return next()
			}
			bcrypt.hash(user.password, salt, function(err, hash){
				if (err) {
					return next()
				}
				user.password = hash
				next()
			})
		})
	}
	else{
		this.meta.updateAt = Date.now()
		next()
	}
})

UserSchema.methods = {
	comparePassword: function(_password, cb){
		bcrypt.compare(_password, this.password, function(err, ismatch){
			if (err) {
				return cb(err)
			}
			cb(null, ismatch)
		})
	}
}

UserSchema.statics = {
	fetch : function(cb){
		return this.find({}).sort('meta.updateAt').exec(cb)
	},
	findById : function(id, cb){
		return this.findOne({_id: id}).exec(cb)
	}
}

module.exports = UserSchema