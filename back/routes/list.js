const {cookieAuthJWT} = require('../middleware/cookieAuthJWT');

module.exports = (app) => {
  	app.post("/list", cookieAuthJWT, (req, res, ) => {
    	console.log(req.user);
    	res.redirect("/list");
  	});
}