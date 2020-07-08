const express = require("express");
const router = express.Router();
const History = require("../../models/History");
const passport = require("passport");
const User = require("../../models/User");

router.post("/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.findById(req.user.id);
    console.log(user);
    const history = new History({ user, yelp_id: user.rolled_restaurant });
    await history.save();
    res.json({ msg: "ok" });
  }
);


module.exports = router;

