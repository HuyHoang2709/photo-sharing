import {
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/joy";
import ImageUpload from "../ImageUpload";
import { Image, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const User = ({ userInfo }) => {
  return (
    <>
      <Card>
        <div className="flex justify-between">
          <Typography
            level="title-lg"
            startDecorator={
              <Avatar>
                <Person />
              </Avatar>
            }
          >
            Your Info
          </Typography>
          <Button variant="plain" startDecorator={<Image />}>
            {/* eslint-disable-next-line react/prop-types */}
            <Link to={`/photos/${userInfo._id}`}>View your photos</Link>
          </Button>
        </div>
        <Divider />
        <CardContent>
          <div className="space-y-4 p-4">
            <div className="flex space-x-2">
              <Typography level="title-md">Full Name:</Typography>
              <Typography level="body-md">
                {/* eslint-disable-next-line react/prop-types */}
                {userInfo.first_name} {userInfo.last_name}
              </Typography>
            </div>
            <div className="flex space-x-2">
              <Typography level="title-md">ID:</Typography>
              {/* eslint-disable-next-line react/prop-types */}
              <Typography level="body-md">{userInfo._id}</Typography>
            </div>
            <div className="flex space-x-2">
              <Typography level="title-md">Location:</Typography>
              {/* eslint-disable-next-line react/prop-types */}
              <Typography level="body-md">{userInfo.location}</Typography>
            </div>
            <div className="flex space-x-2">
              <Typography level="title-md">Description:</Typography>
              {/* eslint-disable-next-line react/prop-types */}
              <Typography level="body-md">{userInfo.description}</Typography>
            </div>
            <div className="flex space-x-2">
              <Typography level="title-md">Occupation:</Typography>
              {/* eslint-disable-next-line react/prop-types */}
              <Typography level="body-md">{userInfo.occupation}</Typography>
            </div>
          </div>
        </CardContent>
      </Card>
      <ImageUpload />
    </>
  );
};

export default User;
