const express = require("express");
const authorController = require("../controller/auth");
const router = express.Router();

router.post("/signup", authorController.signup);
router.post("/login", authorController.login);


module.exports = router;
