const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Server TASK PRO is running!");
    app.listen(PORT, () => {
      console.log(`Server TASK PRO is running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("SErver TASK PRO is not running! Error:", error.message);
  });
