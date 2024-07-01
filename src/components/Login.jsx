import { Button, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { formatJWTTokenToUser } from "../utiles/tokenformat.utils";
import { useUserContext } from "./UserProvider";

function Login() {
  const { login } = useUserContext();

  async function handleLogin(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);

    const username = formData.get("username");
    const password = formData.get("password");
    const res = await axios.post("http://localhost:3000/api/auth/login", {
      username,
      password,
    });

    const { token } = res.data;
    localStorage.setItem("token", token);

    const { userId } = formatJWTTokenToUser(token);

    const userInfo = await axios.get(
      `http://localhost:3000/api/auth/login/${userId}`
    );

    console.log(userInfo.data);
    login(userInfo.data);
  }

  return (
    <>
      <div className="text-center mt-10">
        <h1 className="text-3xl mb-10">Login Page</h1>
        <form onSubmit={handleLogin}>
          <div>
            <TextField label="username" variant="standard" name="username" />
          </div>
          <div className="my-10">
            <TextField
              label="password"
              type="password"
              variant="standard"
              name="password"
            />
          </div>
          <Button variant="contained" sx={{ width: "10rem" }} type="submit">
            Login
          </Button>
        </form>
      </div>
    </>
  );
}

export default Login;
