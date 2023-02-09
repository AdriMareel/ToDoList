const jwt = require('jsonwebtoken');

const getUser = async (username, password) => {
    //check if user exists in db
    return {userId : 123, password : "admin", username : "admin"};
}

module.exports = (app) => {
    app.post('/login', async (req, res) => {
        const { username, password } = req.body;

        console.log(req.body);

        const user = await getUser(username, password);

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        if(user.password !== password) {
            return res.status(401).json({ error: 'Wrong password' });
        }

        delete user.password;

        const token = jwt.sign(user, "my-secret", {expiresIn : '1h'});

        res.cookie('token', token, { httpOnly: true });

        return res.redirect('/list');
    });
}