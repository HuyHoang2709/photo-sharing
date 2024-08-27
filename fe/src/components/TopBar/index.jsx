import { Logout } from "@mui/icons-material";
import { Button } from "@mui/joy";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const TopBar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("https://g92sth-8080.csb.app/api/admin/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          document.cookie = `token=`;
          navigate("/");
          return res.json();
        }
        throw res;
      })
      .then(() => {
        // Handle logout twice error
        window.location.reload();
      })
      .catch(() => {});
  };

  return (
    <AppBar>
      <Toolbar className="flex justify-between">
        <Typography variant="h5" color="inherit">
          {/* eslint-disable-next-line react/prop-types */}
          {user ? `Hi ${user.first_name}` : "Please Login"}
        </Typography>
        {user && (
          <Button
            onClick={handleLogout}
            variant="outline"
            startDecorator={<Logout />}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
