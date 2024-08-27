import { Grid } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import TopBar from "./components/TopBar";
import Dashboard from "./components/Dashboard";
import LoginRegister from "./components/LoginRegister";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://g92sth-8080.csb.app/api/admin/user", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((user) => setUser(user))
      .catch(() => {});
  }, []);

  return (
    <Router>
      <Grid container className="p-4">
        <Grid item xs={12}>
          <TopBar user={user} />
        </Grid>
        <div className="mt-16"></div>
        {user ? <Dashboard user={user} /> : <LoginRegister />}
      </Grid>
      <Toaster />
    </Router>
  );
};

export default App;
