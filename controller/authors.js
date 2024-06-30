const { Author, Book } = require("../models");
exports.getAuthors = (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const limit = parseInt(pageSize);
    const offset = (page - 1) * limit;
    Author.findAll({
        limit: limit,
        offset: offset,
        include: [
            {
                model: Book,
            },
        ],
    })
        .then((authors) => {
            res.json({ currentPage: parseInt(page), authors });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getAuthor = (req, res) => {
    const authorId = req.params.id;
    Author.findByPk(authorId, {
        include: [{ model: Book }],
    })
        .then((author) => {
            res.json(author);
        })
        .catch((err) => {
            res.status(404).send("Author not found");
        });
};

exports.createAuthor = (req, res) => {
    Author.create(req.body)
        .then((author) => {
            res.json(author);
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.updateAuthor = (req, res) => {
    const authorId = req.params.id;
    Author.findByPk(authorId)
        .then((author) => {
            author
                .update(req.body)
                .then((author) => {
                    res.json(author);
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            res.status(404).send("Author not found");
        });
};

exports.deleteAuthor = (req, res) => {
    const authorId = req.params.id;
    Author.findByPk(authorId)
        .then((author) => {
            author
                .destroy()
                .then((author) => {
                    res.json(author);
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            res.status(404).send("Author not found");
        });
};
