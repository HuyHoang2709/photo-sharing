const express = require("express");

const app = express();
const port = 8080;
const cors = require("cors");

const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
const AuthenRouter = require("./routes/AuthenRouter");
const CommentRouter = require("./routes/CommentRouter");
const UploadRouter = require("./routes/UploadRouter");

dbConnect();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", UserRouter);
app.use("/api/photosOfUser", PhotoRouter);
app.use("/api/admin", AuthenRouter);
app.use("/api/commentsOfPhoto", CommentRouter);
app.use("/api/photo/new", UploadRouter);

app.get("/", (req, res) => {
  res.send("Test connection for Photo Sharing App API!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
