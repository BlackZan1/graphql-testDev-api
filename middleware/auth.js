const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const failedAuth = () => {
        req.isAuth = false;

        next();
    }

    if(req.method == 'OPTIONS') return next();

    const authHeader = req.get('Authorization');

    if(!authHeader) return failedAuth();

    const token = authHeader.split(' ')[1];
    
    if(!token.trim().length) return failedAuth();

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    }
    catch(err) {
        console.log(err);
        throw err;
    }

    if(!decoded) return failedAuth();

    console.log(token, decoded);

    req.isAuth = true;
    req.userId = decoded.userId;
}