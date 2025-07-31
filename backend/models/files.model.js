const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
	name: { type: String, required: true },
    path: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    size: { type: Number, required: true },
    type: { type: String, required: true },
    created: { type: Date, default: Date.now },
})

module.exports = mongoose.model('file', fileSchema);