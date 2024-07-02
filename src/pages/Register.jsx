import { Button, TextField } from "@mui/material";
import React from "react";

function Register() {
  async function handleRegister(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);

    const username = formData.get("username");
    const password = formData.get("password");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");

    console.log({ username, password, firstName, lastName }); // Debugging line to check form data

    await api.post("/auth/register", {
      username,
      password,
      firstName,
      lastName,
    });
  }

  return (
    <>
      <div className="text-center mt-10">
        <h1 className="text-3xl mb-10">Register Page</h1>
        <form onSubmit={handleRegister}>
          <div>
            <TextField label="Username" variant="standard" name="username" />
          </div>
          <div className="my-10">
            <TextField
              label="Password"
              type="password"
              variant="standard"
              name="password"
            />
          </div>
          <div className="mb-10">
            <TextField label="First Name" variant="standard" name="firstName" />
          </div>
          <div className="mb-10">
            <TextField label="Last Name" variant="standard" name="lastName" />
          </div>
          <Button variant="contained" sx={{ width: "10rem" }} type="submit">
            Register
          </Button>
        </form>
      </div>
    </>
  );
}

export default Register;
