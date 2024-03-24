var config = require('../config');
const jwt = require('jsonwebtoken');



function verifyToken(req, res, next) {
    try {
        var token = req.body.token;
        // console.log('token', token);
        if (!token)
            return res.status(403).send({ status: false, message: 'No token provided.' });

        const decoded = jwt.verify(token, config.secret);
        if (!decoded) {
            return res.json({ msg: 'Invalid Token id', status: false,  invalidToken: true})
        }
        console.log('decoded', decoded);
        req.body.user = decoded.user;
        next();
    }
    catch (err) {
        console.log(err);
        return res.json({ msg: 'Invalid Token', status: false, invalidToken: true })
    }
}

module.exports = { verifyToken };