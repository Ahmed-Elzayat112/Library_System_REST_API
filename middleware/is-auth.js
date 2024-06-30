const jwt = require("jsonwebtoken");
const { User } = require("../models");
const secretKey = process.env.JWT_SECRET_KEY;

exports.authenticate = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res
                .status(401)
                .json({ message: "Failed to authenticate token" });
        }

        req.userId = decoded.userId;
        // console.log(decoded);
        req.userRole = decoded.role;
        next();
    });
};

exports.isAdmin = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            id: req.userId,
        },
    });

    if (user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    next();
};
