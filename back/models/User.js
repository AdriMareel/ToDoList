const mongoose = require('mongoose');

module.exports = userSchema = new mongoose.Schema({
    id : String,
    username: String,
    password: String,
});