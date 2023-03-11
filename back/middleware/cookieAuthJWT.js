const jwt = require('jsonwebtoken');

exports.verifyJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.clearCookie("token");
		res.clearCookie("username");
        return res.redirect('/');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.username = decoded;
        next();
    } catch (err) {
		res.clearCookie("token");
		res.clearCookie("username");
        return res.redirect('/');
    }
};
