const jwt = require('jsonwebtoken');

async function auth(req, res) {
	let token = req.header('x-auth-token');
	console.log('testing token');
	console.log(token);
	if (!token)
		return res.status(403).json({
			auth: 'No token sent'
		});
	try {
		var result = jwt.verify(token, 'secret');
		req.body.user_name = result.user_name;
		console.log('Here inside auth/auth : user type is  : ', result.type);
		console.log(result.type);
		return;
	} catch (err) {
		console.log(result);
		console.log(err);
		return res.status(500).json({
			server: 'Token info invalid'
		});
	}
}
module.exports = auth;