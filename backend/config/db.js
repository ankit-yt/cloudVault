const mongoose = require('mongoose');
const db = mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected to MongoDB")).catch(() => console.log("Failed to connect to MongoDB"));

module.exports = db;