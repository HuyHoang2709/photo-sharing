import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  CardActions,
} from "@mui/material";

import { Button } from "@mui/joy";

import { Link, useParams } from "react-router-dom";
import { List, ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import fetchModel from "../../../lib/fetchModelData";
import { blue, grey } from "@mui/material/colors";

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchModel(`/api/user/${userId}`);
        setUser(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <Grid container className="flex justify-center">
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardHeader
            title={user.first_name + " " + user.last_name}
            sx={{
              textAlign: "center",
              backgroundColor: blue[700],
              color: grey[50],
            }}
          />
          <Divider />
          <CardContent sx={{ backgroundColor: "#f1f1f1" }}>
            <List>
              <ListItem>
                <Typography variant="body1">
                  <b>ID:</b> {user._id}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body1">
                  <b>Location:</b> {user.location}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body1">
                  <b>Description:</b> {user.description}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body1">
                  <b>Occupation:</b> {user.occupation}
                </Typography>
              </ListItem>
            </List>
          </CardContent>
          <Divider />
          <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="plain">
              <Link to={"/"}>Exit</Link>
            </Button>
            <Button variant="solid">
              <Link to={`/photos/${user._id}`}>View Photos</Link>
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserDetail;
