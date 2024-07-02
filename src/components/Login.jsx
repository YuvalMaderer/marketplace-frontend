import { Button, TextField } from "@mui/material";
import React from "react";
import { formatJWTTokenToUser } from "../utiles/tokenformat.utils";
import { useUserContext } from "./UserProvider";
import api from "../services/api.service";

function Login() {
  const { login } = useUserContext();

  async function handleLogin(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);

    const username = formData.get("username");
    const password = formData.get("password");
    const res = await api.post("/auth/login", {
      username,
      password,
    });

    const { token } = res.data;
    localStorage.setItem("token", token);

    const { userId } = formatJWTTokenToUser(token);

    const userInfo = await api.get(`/auth/login/${userId}`);

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
