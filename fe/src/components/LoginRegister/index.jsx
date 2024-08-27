import { Grid } from "@mui/material";
import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { Button } from "@mui/joy";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <Grid item xs={12} className="border rounded-md h-[calc(100vh-100px)] p-4">
      <div className="flex flex-col items-center h-full overflow-auto">
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <div className="flex w-full flex-col items-center">
          <p>{isLogin ? "Don't have" : "Have"} an account?</p>
          <Button variant="plain" size="md" onClick={toggleLogin}>
            {isLogin ? "Register" : "Login"}
          </Button>
        </div>
      </div>
    </Grid>
  );
};

export default LoginRegister;
