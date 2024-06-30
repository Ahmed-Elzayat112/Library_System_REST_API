const express = require("express");

const bookController = require("../controller/books");
const { isAdmin, authenticate } = require("../middleware/is-auth");
const router = express.Router();

router.get("/books", bookController.getBooks);
router.get("/books/:id", bookController.getBook);

router.post("/books", authenticate, isAdmin, bookController.createBook);
router.put("/books/:id", authenticate, isAdmin, bookController.updateBook);
router.delete("/books/:id", authenticate, isAdmin, bookController.deleteBook);

module.exports = router;