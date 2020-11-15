require("dotenv").config();
const express = require("express");
const app = express();
const database = require("./db");

database.sync();

app.use(express.json());

let user = require("./controllers/usercontroller");
app.use("/user", user);
let recipe = require("./controllers/recipecontroller");
app.use("/recipe", recipe);

app.listen(3000, function () {
  console.log("App is listening on port 3000");
});
