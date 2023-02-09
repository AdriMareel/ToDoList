const cookieAuthJWT = require('../middleware/cookieAuthJWT');

module.exports = (app) => {
    app.post('/list', async (req, res) => {
        res.sendFile(__dirname + '/front/list.html');
    });
}