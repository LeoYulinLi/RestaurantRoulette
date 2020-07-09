const express = require("express");
const router = express.Router();
const History = require("../../models/History");
const passport = require("passport");
const User = require("../../models/User");

router.post("/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.findById(req.user.id);
    if (user.rolled_restaurant) {
        const history = new History({ user, yelp_id: user.rolled_restaurant });
        await history.save();
        await user.update({ $set: { rolled_restaurant: null }});
        res.json({ msg: "ok" });
    } else {
        res.status(400).json({ msg: "not rolled" });
    }
  }
);


module.exports = router;

