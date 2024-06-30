const express = require("express");

const authorController = require("../controller/authors");
const router = express.Router();

router.get("/authors", authorController.getAuthors);

router.get("/authors/:id", authorController.getAuthor);

router.post("/authors", authorController.createAuthor);

router.put("/authors/:id", authorController.updateAuthor);

router.delete("/authors/:id", authorController.deleteAuthor);

module.exports = router;
