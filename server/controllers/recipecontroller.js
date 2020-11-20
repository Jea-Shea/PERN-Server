let express = require("express");
let validateSession = require('../middleware/validatesession')
const router = express.Router();
const Recipe = require('../db').import('../models/recipes');

router.post("/create", (req, res) => {
  const recipeFromRequest = {
    name: req.body.recipe.name,
    ingredients: req.body.recipe.ingredients,
    instructions: req.body.recipe.instructions,
    notes: req.body.recipe.notes,
    favorite: req.body.recipe.favorite,
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
      title: req.body.journal.title,
      date: req.body.journal.date,
      entry: req.body.journal.entry,
  };

  const query = { where: { id: req.params.entryId, owner_id: req.user.id }};

  Recipe.update(updateRecipeEntry, query)
      .then((recipes) => res.status(200).json(recipes))
      .catch((err) => res.status(500).json({ error: err }));
});

router.delete('/delete/:id', validateSession, function (req, res) {
  const query = { where: { id: req.params.id, owner: req.user.id }};

  Recipe.destroy(query)
      .then(() => res.status(200).json({ message: "Recipe Entry Removed!"}))
      .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
