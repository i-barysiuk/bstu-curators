var jwt = require('jsonwebtoken');
var secret = 'blasupersecretbla';


class JWTService {
    generate(data) {
        var accessToken = jwt.sign({
            id : data.id,
            roles : data.role
        }, secret, { expiresIn: '1h' });
        var refreshToken = jwt.sign({
            id : data.id
        }, secret, { expiresIn: '1d' });
        return {accessToken, refreshToken};
    }

    validate(token) {
        var err = jwt.verify(token, secret);
        return (err);
    }
}


module.exports = new JWTService;