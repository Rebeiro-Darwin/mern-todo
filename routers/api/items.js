const express = require("express");
const router = express.Router();
const Item = require("../../models/items");
const auth = require("../../middleware/auth");
//  api/items
// get all Items
router
  .route("/")
  .get((req, res) => {
    Item.find({})
      .sort({
        date: -1
      })
      .then(items => {
        res.json(items);
      });
  })
  .post(auth, (req, res) => {
    console.log(req.body);
    const newItem = new Item({
      name: req.body.name
    });
    newItem
      .save()
      .then(Item => {
        res.json(Item);
      })
      .catch(err => {
        res.send(err);
      });
  });

router.route("/:id").delete(auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove())
    .then(() =>
      res.status(200).json({
        success: true
      })
    )
    .catch(err =>
      res.status(400).json({
        success: false
      })
    );
});

module.exports = router;
