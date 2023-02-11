const mongoose = require('mongoose');

module.exports = taskSchema = new mongoose.Schema({
	userId : String,
	id : String,
    title : String,
    description: String,
    status : String,
});
