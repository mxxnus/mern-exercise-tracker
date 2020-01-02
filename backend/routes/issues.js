const router = require("express").Router();
let Issue = require("../models/issue.model");

//find all issues
router.route("/").get((req, res) => {
  Issue.find()
    .then(issues => res.json(issues))
    .catch(err => res.status(400).json("Error: " + err));
});
// add an issue
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newIssue = new Issue({
    username,
    description,
    duration,
    date
  });

  newIssue
    .save()
    .then(() => res.json("Issue added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

//returns a specific issue
router.route("/:id").get((req, res) => {
  Issue.findById(req.params.id)
    .then(issue => res.json(issue))
    .catch(err => res.status(400).json("Error: " + err));
});

//delete issue
router.route("/:id").delete((req, res) => {
  Issue.findByIdAndDelete(req.params.id)
    .then(() => res.json("Issue deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

//update issue by issue id
router.route("/update/:id").post((req, res) => {
  Issue.findById(req.params.id)
    .then(issue => {
      issue.username = req.body.username;
      issue.description = req.body.description;
      issue.duration = Number(req.body.duration);
      issue.date = Date.parse(req.body.date);

      issue
        .save()
        .then(() => res.json("Issue updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
