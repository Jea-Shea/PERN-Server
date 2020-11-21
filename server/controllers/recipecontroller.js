let express = require('express');
const router = express.Router();
const Recipe = require('../db').import('../models/recipes');
const validateSession = require('../middleware/validatesession')

router.post('/create', (req,res) => {
    const recipeFromRequest   = {
        name: req.body.recipes.name,
        ingredients: req.body.recipes.ingredients,
        instructions: req.body.recipes.instructions,
        user: req.body.recipes.user
    }

    Recipe.create(recipeFromRequest)
    .then(recipe => res.status(200).json(recipe))
    .catch(err => res.status(500).json(err))
});

router.get('/search', function(req,res){
    res.send('Add API recipe search here')
});

router.get('/', validateSession, function(req,res){
    Recipe.findAll({
      where: { user: req.user.id }
    })
    .then(recipes => res.status(200).json(recipes)) //200 means okay
    .catch(err => res.status(500).json({ //500 internal server errpr
        error: err
    }))
});

router.put('/update/:entryId', validateSession, function (req, res) {
    const updateRecipeEntry = {
      name: req.body.recipes.name,
      ingredients: req.body.recipes.ingredients,
      instructions: req.body.recipes.instructions,
    };
  
    const query = { where: { id: req.recipes.id, owner_id: req.user.id }};
  
    Recipe.update(updateRecipeEntry, query)
        .then((recipes) => res.status(200).json(recipes))
        .catch((err) => res.status(500).json({ error: err }));
  });
  
  router.delete('/delete/:id', validateSession, function (req, res) {
    const query = { where: { id: req.params.id, user: req.user.id }};
  
    Recipe.destroy(query)
        .then(() => res.status(200).json({ message: "Recipe Entry Removed!"}))
        .catch((err) => res.status(500).json({ error: err }));
  });
  
  module.exports = router;
