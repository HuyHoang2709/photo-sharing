const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const router = express.Router();

router.post("/", jsonParser, async (req, res) => {});

router.get("/:id", jsonParser, async (req, res) => {
  try {
    const photos = await Photo.find({ user_id: req.params.id })
      .populate("comments.user_id", "first_name last_name")
      .exec();

    res.send(photos);
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = router;
