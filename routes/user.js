const express = require("express");

const userController = require("../controller/user");
const router = express.Router();

router.post("/users", userController.getAllUsers);
