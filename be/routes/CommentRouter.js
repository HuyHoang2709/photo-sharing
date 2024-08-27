const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const Photo = require("../db/photoModel");
const router = express.Router();

// [POST] /api/commentsOfPhoto/:photo_id
router.post("/:id", jsonParser, async (req, res) => {
  const { createdAt, comment, userId } = req.body;
  const photo = await Photo.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: {
        comments: [
          {
            comment: comment,
            date_time: createdAt,
            user_id: userId,
          },
        ],
      },
    }
  );
  return res.json("Comment success");
});

module.exports = router;
