let express = require('express');
let router = express.Router();

router.get('/create', function(req,res){
    res.send('Add recipe input functions here')
});

router.get('/search', function(req,res){
    res.send('Add API recipe search here')
});

router.get('/save', function(req,res){
    res.send('send it to the database here?')
});

router.get('/update', function(req,res){
    res.send('Add notes and update recipes that were saved')
});

router.get('/delete', function(req,res){
    res.send('Get rid of recipes no longer wanted by user')
});

module.exports = router