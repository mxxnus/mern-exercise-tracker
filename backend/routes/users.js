const router = require("express").Router();
let User = require("../models/user.model");

//find all users - GET request
router.route("/").get((req, res) => {
  //mongoose method, returns a promise that finds all models in users
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

//add a user - POST request
router.route("/add").post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
