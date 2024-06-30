const express = require("express");

const authorController = require("../controller/authors");
const { isAdmin, authenticate } = require("../middleware/is-auth");
const router = express.Router();

router.get("/authors", authorController.getAuthors);
router.get("/authors/:id", authorController.getAuthor);

router.post("/authors", authenticate, isAdmin, authorController.createAuthor);
router.put(
    "/authors/:id",
    authenticate,
    isAdmin,
    authorController.updateAuthor
);
router.delete(
    "/authors/:id",
    authenticate,
    isAdmin,
    authorController.deleteAuthor
);

module.exports = router;
