const express = require("express");
const router = express.Router();
const History = require("../../models/History");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

router.get("/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    History
    .find({user: req.user.id})
    .then(histories => {
        res.json(histories)
    })
    .catch(err => res.status(400).json(err))
});

// router.get("/profile", (req, res) => {
//     // res.json( {history: History.find({ user: req.params.id }).then((history) => res.json(history)))
//       res.json({ history: await History.find() });
// });



module.exports = router;

