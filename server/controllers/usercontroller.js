const router = require("express").Router();
const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/signup", (req, res) => {
  console.log(req.body.user.email);
  User.create({
    email: req.body.user.email,
    passwordHash: bcrypt.hashSync(req.body.user.passwordHash, 13),
    groceryList: ""
  })
    .then(
      (createSuccess = (user) => {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24,
        });
        res.json({
          user: user,
          message: "User successfully created",
          sessionToken: token,
        });
      })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.user.email,
    },
  })
    .then(
      (loginSuccess = (user) => {
        if (user) {
          bcrypt.compare(
            req.body.user.passwordHash,
            user.passwordHash,
            (err, matches) => {
              if (matches) {
                let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                  expiresIn: 60 * 60 * 24,
                });
                res.status(200).json({
                  user: user,
                  message: "User logged in",
                  sessionToken: token,
                });
              } else {
                res.status(502).send({ error: "Login failed" });
              }
            }
          );
        } else {
          res.status(500).json({ error: "User does not exist" });
        }
      })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
