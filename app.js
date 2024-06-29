const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const { Author, Book } = require("./models");

const app = express();
const port = 3005;

app.use(bodyParser.json());

// Associations

Author.hasMany(Book);
Book.belongsTo(Author);

// Routes for authors
app.get("/authors", async (req, res) => {
    const authors = await Author.findAll({ include: Book });
    res.json(authors);
});

app.get("/authors/:id", async (req, res) => {
    const authorId = req.params.id;
    const author = await Author.findByPk(authorId);
    res.json(author);
});

app.post("/authors", async (req, res) => {
    const author = await Author.create(req.body);
    res.json(author);
});

app.put("/authors/:id", async (req, res) => {
    const author = await Author.findByPk(req.params.id);
    if (author) {
        await author.update(req.body);
        res.json(author);
    } else {
        res.status(404).send("Author not found");
    }
});

app.delete("/authors/:id", async (req, res) => {
    const author = await Author.findByPk(req.params.id);
    if (author) {
        await author.destroy();
        res.send("Author deleted");
    } else {
        res.status(404).send("Author not found");
    }
});

// Routes for books
app.get("/books", async (req, res) => {
    const books = await Book.findAll({
        include: [{ model: Author }],
    });
    res.json(books);
});

app.get("/books/:id", async (req, res) => {
    const book = await Book.findByPk(req.params.id, {
        include: [{ model: Author }],
    });
    if (book) {
        res.json(book);
    } else {
        res.status(404).send("Book not found");
    }
});

app.post("/books", async (req, res) => {
    const book = await Book.create(req.body);
    res.json(book);
});

app.put("/books/:id", async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        await book.update(req.body);
        res.json(book);
    } else {
        res.status(404).send("Book not found");
    }
});

app.delete("/books/:id", async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        await book.destroy();
        res.send("Book deleted");
    } else {
        res.status(404).send("Book not found");
    }
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
