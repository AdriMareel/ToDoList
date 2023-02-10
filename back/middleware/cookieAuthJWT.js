const jwt = require('jsonwebtoken');

exports.cookieAuthJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/');
    }

    try {
        const decoded = jwt.verify(token, "my-secret");
        req.user = decoded;
        next();
    } catch (err) {
		res.clearCookie("token");
        return res.redirect('/');
    }
};
