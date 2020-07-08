const express = require("express");
const router = express.Router();
const History = require("../../models/History");

router.get("/", async (req, res) => {
//   res.json({ restaurants: await History.find() });
    History
    .find()
    .then(restaurants => {
        res.json(restaurants)
    })
    .catch(err => res.status(400).json(err))
});

// router.get("/profile", (req, res) => {
//     // res.json( {history: History.find({ user: req.params.id }).then((history) => res.json(history)))
//       res.json({ history: await History.find() });
// });



module.exports = router;

