const router = require("express").Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
router
  .route("/")
  .get((req, res) => {
    res.send("register");
  })
  .post((req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    User.findOne({ email }).then(user => {
      if (user) return res.status(400).json({ msg: "Email already exists" });
      const newUser = new User({
        name,
        email,
        password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.save().then(user => {
            res.json({
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              }
            });
          });
        });
      });
    });
  });
module.exports = router;
