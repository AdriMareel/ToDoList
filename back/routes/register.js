const jwt = require('jsonwebtoken');

const checkUser = async (username, password) => {
    //check if user exists in db
    return false;
}

const createUser = async (username, password) => {
    //create user in db
}

module.exports = (app) => {

    app.post('/register', async (req, res) => {
        const { username, password } = req.body;

        const userExists = await checkUser(username, password);

        if (userExists) {
            return res.status(401).json({ error: 'User already exists' });
        }

        //create user in db
        createUser(username, password);

        const token = jwt.sign({username}, "my-secret", {expiresIn : '1h'});
        res.cookie('token', token, { httpOnly: true });

        return res.redirect('/list');
    });
}