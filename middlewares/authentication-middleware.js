const User = require('./../models').User;

function authMiddleware(req, res, next) {
    if (req.cookies['session_id']) {
        const data = req.cookies['session_id'].split('.');
        const userId = data[0];
        const sessionId = data[1];
        console.log(data);
        User
            .getUserById(userId)
            .then((user) => {
                if (user.isValidUserSession(sessionId)) {
                    req.user = user;
                }
                
                next();
            });
        
    } else {
        next();
    }
}

module.exports = authMiddleware;