const express = require("express");

const userController = require("../controller/user");
const { isAdmin, authenticate } = require("../middleware/is-auth");
const router = express.Router();

router.get("/users", authenticate, isAdmin, userController.getAllUsers);


module.exports = router;
