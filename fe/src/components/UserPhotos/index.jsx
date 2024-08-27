import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import { Button, Typography } from "@mui/joy";
import { Avatar } from "@mui/joy";
import { AccessTime, ArrowBackIos } from "@mui/icons-material";

import "./styles.css";
import fetchModel from "../../../lib/fetchModelData";
import Comment from "../Comment";

// eslint-disable-next-line react/prop-types
const UserPhotos = ({ userInfo }) => {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get photos list
        const data = await fetchModel(`/api/photosOfUser/${userId}`);
        setPhotos(data.reverse());
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div className="user-photos-container">
      <div className="mb-4 flex justify-between w-full">
        <Button
          variant="plain"
          startDecorator={<ArrowBackIos fontSize="small" />}
        >
          <Link to="/">Back to Dashboard</Link>
        </Button>
        <Button variant="plain">
          <Link to={`/user/${userId}`}>Go to profile</Link>
        </Button>
      </div>
      {photos &&
        photos?.map((photo) => (
          <Card
            variant="outlined"
            key={photo._id}
            sx={{ marginBottom: "20px" }}
          >
            <CardHeader
              avatar={
                <Avatar>
                  <AccessTime />
                </Avatar>
              }
              title={
                <Typography level="body-md">
                  {new Date(photo.date_time).toLocaleString()}
                </Typography>
              }
            />
            <CardMedia
              className="border border-r-0 border-l-0"
              component="img"
              image={photo.image_url}
            />
            <CardContent>
              <div className="p-2">
                <Comment
                  comments={photo.comments}
                  userInfo={userInfo}
                  photoId={photo._id}
                />
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default UserPhotos;
