
// Midlleware to virify user token
const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    if (!token.split(" ")[1]) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token.split(" ")[1], process.env.RSA_PUBLIC_KEY, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        req.userId = decoded.userId;
        console.log(decoded.userId)
        next();
    });
}

// Midlleware to virify admin token
const verifyAdminToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    if (!token.split(" ")[1]) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token.split(" ")[1], process.env.RSA_PUBLIC_KEY, (err, decoded) => {
        if (err)
        {
            console.log(err)
            return res.status(500).send({ auth: false, message: 'Error: Failed to authenticate token.' });
        }

        if(decoded.adminId !== process.env.ADMIN_ID){ res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });}
        next();
    });
}

//module.exports = {  verifyToken, verifyAdminToken }
export { verifyToken, verifyAdminToken }
