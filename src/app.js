const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");

require("./middlewares/passportConfig");

const corsOptions = require("./cors");
const contactsRouter = require("./routes/routes");

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("tiny"));

app.use(passport.initialize());

app.use("/taskpro", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
