import { useEffect, useState } from "react";
import fetchModel from "../../../lib/fetchModelData";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemButton } from "@mui/material";
import { Typography } from "@mui/joy";
import { Person } from "@mui/icons-material";

// eslint-disable-next-line react/prop-types
const UserList = ({ userInfo }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchModel("/api/user/list");
        setUsers(data);
      } catch (error) {
        console.error("[USER_LIST]", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <List component="nav">
        <ListItem>
          <ListItemButton>
            <Link to="/">
              <Typography level="title-lg" startDecorator={<Person />}>
                Your Profile
              </Typography>
            </Link>
          </ListItemButton>
        </ListItem>
        {users.map((user) => {
          // eslint-disable-next-line react/prop-types
          const checkUser = userInfo._id === user._id;
          if (!checkUser)
            return (
              <ListItem key={user._id}>
                <ListItemButton>
                  <Link
                    className="w-full text-blue-500 font-medium text-lg"
                    to={`/user/${user._id}`}
                  >
                    {`${user.first_name} ${user.last_name}`}
                  </Link>
                </ListItemButton>
              </ListItem>
            );
        })}
      </List>
    </div>
  );
};

export default UserList;
