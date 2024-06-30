const express = require("express");

const bookController = require("../controller/books");
const router = express.Router();

router.get("/books", bookController.getBooks);

router.get("/books/:id", bookController.getBook);

router.post("/books", bookController.createBook);

router.put("/books/:id", bookController.updateBook);

router.delete("/books/:id", bookController.deleteBook);

module.exports = router;