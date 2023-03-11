const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userSchema = require('../models/User');

const getUser = async (username) => {
    //check if user exists in db
    const User = mongoose.model('users', userSchema);

    return new Promise ((resolve, reject) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) return reject(err);
            resolve(user);
        });
    });
}

module.exports = (app) => {
    app.post('/login', async (req, res) => {
        const { username, password } = req.body;

        const user = await getUser(username);
        console.log(user);

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        if(user.password !== password) {
            return res.status(401).json({ error: 'Wrong password' });
        }

        delete user.password;

        const token = jwt.sign({username,password}, "my-secret", {expiresIn : '1h'});

        res.cookie('token', token, { httpOnly: true });
		res.cookie('username', username);

        return res.status(200).json({ message: 'Logged in'});
    });
}