let express = require("express");
let validateSession = require('../middleware/validatesession')
const router = express.Router();
const Recipe = require('../db').import('../models/recipes');

router.post("/create", (req, res) => {
  const recipeFromRequest = {
    name: req.body.recipes.name,
    ingredients: req.body.recipes.ingredients,
    instructions: req.body.recipes.instructions,
    notes: req.body.recipes.notes,
    favorite: req.body.recipes.favorite,
    owner_id: req.user.id
  };

    Recipe.create(recipeFromRequest)
    .then(recipe => res.status(200).json(recipe))
    .catch(err => res.status(500).json(err))
});

router.get('/search', function(req,res){
    res.send('Add API recipe search here')
});

router.get('/save', function(req,res){
    res.send('send it to the database here?')
});

router.put('/update/:entryId', validateSession, function (req, res) {
  const updateRecipeEntry = {
    name: req.body.recipes.name,
    ingredients: req.body.recipes.ingredients,
    instructions: req.body.recipes.instructions
  };

  const query = { where: { id: req.recipe.id, owner_id: req.user.id }};

  Recipe.update(updateRecipeEntry, query)
      .then((recipes) => res.status(200).json(recipes))
      .catch((err) => res.status(500).json({ error: err }));
});

router.delete('/delete/:id', validateSession, function (req, res) {
  const query = { where: { id: req.body.recipes.id, owner: req.user.id }};

  Recipe.destroy(query)
      .then(() => res.status(200).json({ message: "Recipe Entry Removed!"}))
      .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
