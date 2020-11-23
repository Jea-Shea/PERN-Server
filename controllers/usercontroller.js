const router = require("express").Router();
const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateSession = require("../middleware/validatesession");

router.get("/id", validateSession, (req, res) => {
  let id = req.user.id;
  User.findOne({ where: { id: id } })
    .then((user) => res.status(200).json(id))
    .catch((err) => res.status(500).json({ error: err }));
});

router.post("/signup", (req, res) => {
  User.create({
    name: req.body.user.name,
    email: req.body.user.email,
    passwordHash: bcrypt.hashSync(req.body.user.passwordHash, 13),
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

router.put("/update", validateSession, (req, res) => {
  User.findOne({
    where: {
      id: req.user.id,
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
                let userUpdate = {};
                if (req.body.user.name) {
                  userUpdate.name = req.body.user.name;
                }
                if (req.body.user.email) {
                  userUpdate.email = req.body.user.email;
                }
                if (req.body.user.passwordHash) {
                  userUpdate.passwordHash = req.body.user.passwordHash;
                }
                User.update(userUpdate, {
                  where: {
                    id: req.user.id,
                  },
                });
                res.status(200).json({
                  user: user,
                  message: "User updated",
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

router.get("/groceries", validateSession, (req, res) => {
  let id = req.user.id;
  User.findOne({ where: { id: id } })
    .then((user) => res.status(200).json(user.groceries))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/groceries/update", validateSession, (req, res) => {
  let id = req.user.id;
  const updateGroceries = {
    groceries: req.body.user.groceries,
  };
  User.update(updateGroceries, { where: { id: id } })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/favorites", validateSession, (req, res) => {
  let id = req.user.id;
  User.findOne({ where: { id: id } })
    .then((user) => res.status(200).json(user.favorites))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/favorites/update", validateSession, (req, res) => {
  let id = req.user.id;
  const updateFavorites = {
    favorites: req.body.user.favorites,
  };
  User.update(updateFavorites, { where: { id: id } })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
