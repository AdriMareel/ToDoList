const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userSchema = require('../models/User');

const checkUser = async (username, password) => {
    //check if user exists in db
	const User = mongoose.model('users', userSchema);

	User.findOne({ username: username }, (err, user) => {
		if (err) {
			console.log(err);
			return true;
		}
		if (user) return true;
		else return false;
	});

    return false;
}

const createUser = async (username, password) => {

	return new Promise((resolve, reject) => {
		//create user in db
		const User = mongoose.model('users', userSchema);

		User.create({ username: username, password: password }, (err, user) => {
			if (err) {
				console.log(err);
				resolve({ error : "Error creating User"});
			}
			resolve(User);
		});
	});

}

module.exports = (app) => {

    app.post('/register', async (req, res) => {
        const { username, password } = req.body;

		//check if user exists
        const userExists = await checkUser(username, password);

        if (userExists) {
            return res.status(401).json({ error: 'User already exists' });
        }

        //create user in db
        const user = await createUser(username, password);
		console.log(user);
		if('error' in user) return res.status(401).json({ error: user.error });

        const token = jwt.sign({username}, "my-secret", {expiresIn : '1h'});
        res.cookie('token', token, { httpOnly: true });
		res.cookie('username', username, { httpOnly: true });

        return res.status(200).json({ message: 'User created' });
    });
}