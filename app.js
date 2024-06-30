const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3005;

const authorRoutes = require("./routes/author");
const bookRoutes = require("./routes/book");
const authRoutes = require("./routes/auth");

app.use(bodyParser.json());
// Routes
app.use(authorRoutes);
app.use(bookRoutes);
app.use(authRoutes);

const db = require("./models/index");

db.sequelize
    .sync({ force: false })
    .then(() => {
        console.log("Database & tables created!");
        app.listen(port, () => {
            console.log(`App running on port ${port}`);
        });
    })
    .catch((err) => console.log(err));
