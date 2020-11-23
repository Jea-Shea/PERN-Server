// import the sequelize package
const Sequelize = require("sequelize");

// create a new instance of Sequelize, connecting us to a database
const database = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

// authenticate that the username and password match, then log in to the database
// database.authenticate()
// .then(() => console.log(`${process.env.NAME} db is connected`))
// .catch(err => console.log(err));
try {
  console.log("Authenticating...");
  database
    .authenticate()
    .then(() => console.log(`${process.env.NAME} db is connected!`));
} catch (err) {
  console.log(err);
}

module.exports = database;
