const { Author, Book } = require("../models");

exports.getBooks = (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const limit = parseInt(pageSize);
    const offset = (page - 1) * limit;

    Book.findAll({
        limit: limit,
        offset: offset,
        include: [
            {
                model: Author,
                as: "author",
            },
        ],
    })
        .then((books) => {
            res.json({
                currentPage: parseInt(page),
                books: books,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Server Error");
        });
};

exports.getBook = (req, res) => {
    const id = req.params.id;
    Book.findByPk(id, {
        include: [
            {
                model: Author,
                as: "author",
            },
        ],
    })
        .then((book) => {
            res.json(book);
        })
        .catch((err) => {
            res.status(404).send("Book not found");
        });
};

exports.createBook = (req, res) => {
    const book = req.body;
    Book.create(book)
        .then((book) => {
            res.json(book);
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.updateBook = (req, res) => {
    const id = req.params.id;
    const book = req.body;
    Book.update(book, {
        where: {
            id: id,
        },
    })
        .then((book) => {
            res.json(book);
        })
        .catch((err) => {
            res.status(404).send("Book not found");
        });
};

exports.deleteBook = (req, res) => {
    const id = req.params.id;
    Book.destroy({
        where: {
            id: id,
        },
    })
        .then((book) => {
            res.json(book);
        })
        .catch((err) => {
            res.status(404).send("Book not found");
        });
};
