const Sequelize = require('sequelize');
const sequelize = new Sequelize('recipes', 'postgres', '1234',{
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function(){
        console.log('connected to recipes database');
    },
    function(err){
        console.log(err);
    }
);
module.exports = sequelize;