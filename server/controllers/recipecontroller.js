let express = require("express");
const router = express.Router();
const Recipe = require("../db").import("../models/recipes");

router.post("/create", (req, res) => {
  const recipeFromRequest = {
    name: req.body.recipe.name,
    ingredients: req.body.recipe.ingredients,
    instructions: req.body.recipe.instructions,
    notes: req.body.recipe.notes,
    favorite: req.body.recipe.favorite,
  };

  Recipe.create(recipeFromRequest)
    .then((recipe) => res.status(200).json(recipe))
    .catch((err) => res.status(500).json(err));
});

router.get("/search", function (req, res) {
  res.send("Add API recipe search here");
});

router.get("/save", function (req, res) {
  res.send("send it to the database here?");
});

router.get("/update", function (req, res) {
  res.send("Add notes and update recipes that were saved");
});

router.get("/delete", function (req, res) {
  res.send("Get rid of recipes no longer wanted by user");
});

module.exports = router;
