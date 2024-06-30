const User = require("../models/user");
exports.getAllUsers = (req, res) => {
    User.findAll()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.status(500).send("No users found");
        });
};
