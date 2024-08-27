import { Grid } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import UserList from "../UserList";
import UserDetail from "../UserDetail";
import UserPhotos from "../UserPhotos";
import User from "../User";

// eslint-disable-next-line react/prop-types
const Dashboard = ({ user }) => {
  return (
    <>
      <Grid item lg={3} md={4}>
        <div className="h-[calc(100vh-100px)] p-4 overflow-auto border rounded-md mr-2">
          <UserList userInfo={user} />
        </div>
      </Grid>
      <Grid item lg={9} md={8}>
        <div className="h-[calc(100vh-100px)] p-4 overflow-auto border rounded-md">
          <Routes>
            <Route path="/user/:userId" element={<UserDetail />} />
            <Route path="/photos/:userId" element={<UserPhotos userInfo={user} />} />
            <Route path="/" element={<User userInfo={user} />} />
          </Routes>
        </div>
      </Grid>
    </>
  );
};

export default Dashboard;
