let express = require('express');
const router = express.Router();
const Recipe = require('../db').import('../models/recipes');

router.post('/create', (req,res) => {
    const recipeFromRequest   = {
        name: req.body.recipes.name,
        ingredients: req.body.recipes.ingredients,
        instructions: req.body.recipes.instructions
    }

    Recipe.create(recipeFromRequest)
    .then(recipe => res.status(200).json(recipe))
    .catch(err => res.status(500).json(err))
});

router.get('/search', function(req,res){
    res.send('Add API recipe search here')
});

router.get('/', function(req,res){
    Recipe.findAll()
    .then(recipes => res.status(200).json(recipes)) //200 means okay
    .catch(err => res.status(500).json({ //500 internal server errpr
        error: err
    }))
});

router.get('/update', function(req,res){
    res.send('Add notes and update recipes that were saved')
});

router.delete('/:id', function(req,res){
    res.send('Get rid of recipes no longer wanted by user');
    Recipe.destroy({ where: { id: req.params.id } }) 
    .then(result => res.status(200).json(result) )
    .catch(err => res.status(500).json({ error:err }))
});

module.exports = router;