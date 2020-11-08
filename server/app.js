let express = require("express");
const app = express();
let sequelize = require('./db');
let recipe = require('./controllers/recipecontroller')

sequelize.sync();
//sequelize.sync({force: true})

app.use(express.json());

app.use('/recipe', recipe)

app.listen(3000, function () {
    console.log("App is listening on port 3000");
})