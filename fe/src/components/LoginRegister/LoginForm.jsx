import { Lock, Person } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Input,
  Typography,
  Divider,
} from "@mui/joy";
import { useState } from "react";

export const LoginForm = () => {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await fetch("https://g92sth-8080.csb.app/api/admin/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login_name: loginName,
        password,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((token) => {
        document.cookie = `token=${token}`;
        window.location.reload();
        console.log(token);
      })
      .catch(() => {});
  };

  return (
    <Card className="min-w-[480px] mb-4 p-4">
      <Typography level="h3" textAlign="center">
        Login
      </Typography>
      <Divider />
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-6 p-4">
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              name="login_name"
              startDecorator={<Person />}
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              startDecorator={<Lock />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <Button type="submit" size="lg">
              Login
            </Button>
          </FormControl>
        </form>
      </CardContent>
    </Card>
  );
};
