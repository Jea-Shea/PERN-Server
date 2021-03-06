require("dotenv").config();
const express = require("express");
const app = express();
const database = require("./db");
const headers = require("./middleware/headers");

database.sync();

app.use(headers);
app.use(express.json());

let user = require("./controllers/usercontroller");
app.use("/user", user);
let recipes = require("./controllers/recipecontroller");
app.use("/recipes", recipes);

app.listen(process.env.PORT, function () {
  console.log(`App is listening on port ${process.env.PORT}`);
});
