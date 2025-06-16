const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    address: String
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);