const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

const secretKey = process.env.JWT_SECRET_KEY;

exports.signup = async (req, res) => {
    const { email, password, role } = req.body;
    if (await User.findOne({ where: { email: email } })) {
        return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    User.create({ email, password: hashedPassword, role: role })
        .then((user) => {
            res.json({ user });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res
            .status(401)
            .json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.json({ token });
};
