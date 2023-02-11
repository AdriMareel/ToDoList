const mongoose = require('mongoose');
const userSchema = require('./models/User');
const taskSchema = require('./models/Task');

// Connect to the database
module.exports = () =>{

    mongoose.set('strictQuery', true);

    mongoose.connect(process.env.MONGO_CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function() {
        console.log('-------- Connected to the database --------');
    });
    
    const User = mongoose.model('users', userSchema);
    const Task = mongoose.model('tasks', taskSchema);
}

