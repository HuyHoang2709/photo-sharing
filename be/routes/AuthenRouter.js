const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const User = require("../db/userModel");
const router = express.Router();
dotenv.config();

// [GET] /api/admin/user
router.get("/user", jsonParser, async (req, res) => {
  const cookie = req.headers.cookie;
  const token = cookie && cookie.split("=")[1];
  const users = await User.find().select({
    login_name: 0,
    password: 0,
  });

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json("Invalid token");
      }
      const user = users.find((u) => u._id.toString() === decoded.userId);
      if (!user) {
        return res.status(401).json("Unauthorized");
      } else {
        return res.json(user);
      }
    });
  } else {
    return res.status(400).json("Bad request");
  }
});

// [POST] /api/admin/login
router.post("/login", jsonParser, async (req, res) => {
  const { login_name, password } = req.body;
  const users = await User.find();
  const user = users.find(
    (user) => user.login_name === login_name && user.password === password
  );
  if (!user) {
    return res.status(400).json("Can't find your account");
  }

  jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, (err, token) => {
    if (err) {
      return res.status(500).json("Error generating token");
    } else {
      return res.json(token);
    }
  });
});

// [POST] /api/admin/logout
router.post("/logout", jsonParser, async (req, res) => {
  const cookie = req.headers.cookie;
  const token = cookie && cookie.split("=")[1];
  const users = await User.find();

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).json("Bad request");
      }
      const user = users.find((u) => u._id.toString() === decoded.userId);
      if (!user) {
        return res.status(401).json("Unauthorized");
      } else {
        return res.status(200).json("Logged out!");
      }
    });
  } else {
    return res.status(400).json("Bad request");
  }
});

module.exports = router;
