const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
	password: { type: String },
	img:{type:String}
	
}, { timestamps: true });
 
userSchema.statics.hashPassword = async function (password) { 
	const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

userSchema.methods.generateToken = async function () {
	const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET);
	console.log(token);
    return token;
}

userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);