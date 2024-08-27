const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const User = require("../db/userModel");
const router = express.Router();
dotenv.config();

// [POST] /api/user/
router.post("/", jsonParser, async (req, res) => {
  const {
    first_name,
    last_name,
    location,
    occupation,
    description,
    login_name,
    password,
  } = req.body;

  // Check for user exist in db
  const users = await User.find();
  const existUser = await users.find((user) => {
    return user.login_name === login_name;
  });
  if (existUser) return res.status(400).json("Username exist!");
  else {
    const newUser = await User.create({
      first_name,
      last_name,
      location,
      occupation,
      description,
      login_name,
      password,
    });
    console.log(newUser);
    jwt.sign(
      { userId: newUser._id.toString() },
      process.env.TOKEN_SECRET,
      (err, token) => {
        if (err) {
          return res.status(500).json("Error generating token");
        } else {
          return res.status(200).json(token);
        }
      }
    );
  }
});

// [GET] /api/user/list
router.get("/list", async (req, res) => {
  try {
    const users = await User.find({}).select({
      _id: 1,
      first_name: 1,
      last_name: 1,
    });
    res.send(users);
  } catch (err) {
    res.status(400).send({ error });
  }
});

// [GET] /api/user/:id
router.get("/:id", jsonParser, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select({
      login_name: 0,
      password: 0,
    });
    res.send(user);
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = router;
