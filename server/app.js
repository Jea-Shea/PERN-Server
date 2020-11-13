require("dotenv").config();
const express = require("express");
const app = express();
const database = require("./db");

database.sync({ force: true });

app.use(express.json());

let user = require("./controllers/usercontroller");
app.use("/user", user);
let recipe = require("./controllers/recipecontroller");
app.use("/recipes", recipe);

app.listen(process.env.PORT, function () {
  console.log("App is listening on port 8080");
});
