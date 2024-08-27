import { Add, Lock, Person } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  Typography,
} from "@mui/joy";
import { useState } from "react";

export const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [occupation, setOccupation] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const [isMatch, setIsMatch] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== retypePassword) setIsMatch(false);
    else {
      const data = {
        first_name: firstName,
        last_name: lastName,
        location,
        description,
        occupation,
        login_name: userName,
        password,
      };
      console.log(data);
      fetch("https://g92sth-8080.csb.app/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
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
    }
  };

  return (
    <Card className="min-w-[480px] mb-4 p-4">
      <Typography level="h3" textAlign="center">
        Register
      </Typography>
      <Divider />
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6 p-4">
          <FormControl>
            <FormLabel>First name</FormLabel>
            <Input
              name="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last name</FormLabel>
            <Input
              name="last_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              minRows={2}
              required
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Occupation</FormLabel>
            <Input
              name="occupation"
              required
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              name="login_name"
              startDecorator={<Person />}
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              startDecorator={<Lock />}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Retype your password</FormLabel>
            <Input
              name="retype-password"
              type="password"
              value={retypePassword}
              onChange={(e) => {
                setIsMatch(true);
                setRetypePassword(e.target.value);
              }}
              startDecorator={<Lock />}
              required
            />
            {!isMatch && (
              <FormHelperText>
                <span className="text-red-500">Password is not matched!</span>
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <Button type="submit" size="lg" startDecorator={<Add />}>
              Create new account
            </Button>
          </FormControl>
        </form>
      </CardContent>
    </Card>
  );
};
