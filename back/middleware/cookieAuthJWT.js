const jwt = require('jsonwebtoken');

exports.all = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/');
    }

    try {
        const decoded = jwt.verify(token, "my-secret");
        req.user = decoded;
        next();
    } catch (err) {
        return res.redirect('/');
    }
};
