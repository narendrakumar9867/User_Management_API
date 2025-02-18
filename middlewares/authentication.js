const { getUser } = require("../services/authentication");

function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.token;
    req.user = null;

    if(!tokenCookie) {
        return res.status(401).json({ msg: "unauthorized"});
    }

    try {
        const user = getUser(tokenCookie);
        if(user) {
            req.user = user;
            return next();
        }
    } catch (error) {
        console.log("error verify token:", error);
        return res.status(401).json({ msg: "invalid or expired token"});
    }
};

module.exports = {
    checkForAuthentication,
};