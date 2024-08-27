const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { Blob } = require("buffer");

const multer = require("multer");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const router = express.Router();
dotenv.config();

const {
  TOKEN_SECRET,
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} = process.env;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getStorage(firebaseApp);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Convert image buffer to blob type to upload
const bufferToBlob = (buffer, mimeType) => {
  return new Blob([buffer], { type: mimeType });
};

// [POST] /api/photo/new
router.post("/", upload.single("image"), (req, res) => {
  const file = req.file;
  const token = req.headers.cookie.split("=")[1];

  if (!file) return res.status(400).json("No image found.");
  else {
    jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
      // Validate user
      if (err) return res.status("400").json("Bad request");
      const users = await User.find();
      const user = users.find((u) => u._id.toString() === decoded.userId);

      // Upload image to Firebase
      const fileName = `${Date.now().toString()}_${decoded.userId}`;
      const imageRef = ref(firestore, `${fileName}`);
      const snapshot = await uploadBytes(
        imageRef,
        bufferToBlob(file.buffer, file.mimetype)
      );
      const imageUrl = await getDownloadURL(snapshot.ref);

      // Create new image in db
      const image = await Photo.create({
        date_time: new Date().toISOString(),
        user_id: user._id,
        comments: [],
        image_url: imageUrl,
      });
      console.log(image);
      return res.status(200).json("Upload completed!");
    });
  }
});

module.exports = router;
