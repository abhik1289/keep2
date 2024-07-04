const jwt = require("jsonwebtoken")
exports.auth = (req, res, next) => {
    try {
        const token = req.cookies.jwt || req.headers["authorization"];
        if (!token) {
            res.status(400).json({ message: "Token not found" })
        } else {
            const decode = jwt.decode(token, process.env.RAnDOM_KEY);
            req.userID = decode;
            next();
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}