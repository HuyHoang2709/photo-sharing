import { Button, Card, CardContent, Input, Typography } from "@mui/joy";
import { useState } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Comment = ({ comments, userInfo, photoId }) => {
  const [cmts, setCmts] = useState(comments);
  const [newComment, setNewComment] = useState("");

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleNewComment = async () => {
    const createdAt = new Date().toISOString();
    // eslint-disable-next-line react/prop-types
    await fetch(`https://g92sth-8080.csb.app/api/commentsOfPhoto/${photoId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        createdAt,
        comment: newComment,
        // eslint-disable-next-line react/prop-types
        userId: userInfo._id,
      }),
    });

    setCmts((commentsList) => [
      ...commentsList,
      {
        comment: newComment,
        date_time: createdAt,
        user_id: {
          // eslint-disable-next-line react/prop-types
          first_name: userInfo.first_name,
          // eslint-disable-next-line react/prop-types
          last_name: userInfo.last_name,
          // eslint-disable-next-line react/prop-types
          _id: userInfo._id,
        },
      },
    ]);
    setNewComment("");
  };

  return (
    <>
      <Typography level="title-md">Comments:</Typography>
      {/* Comments list */}
      <div className="space-y-2 mt-2">
        {cmts.map((cmt) => (
          <Card key={cmt.comment} variant="soft">
            <CardContent>
              <Typography level="body-sm">
                {new Date(cmt.date_time).toLocaleString()}
              </Typography>
              <Typography level="body-md">
                <Link
                  to={`/user/${cmt.user_id._id}`}
                  className="text-blue-500 font-medium"
                >{`${cmt.user_id.first_name} ${cmt.user_id.last_name}`}</Link>
                : {cmt.comment}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* New comment */}
      <div className="flex space-x-2 mt-2">
        <Input
          placeholder="Write your comment"
          value={newComment}
          onChange={handleChange}
          fullWidth
        />
        <Button onClick={handleNewComment}>Comment</Button>
      </div>
    </>
  );
};

export default Comment;
