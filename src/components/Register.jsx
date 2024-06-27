import { Button, TextField } from "@mui/material";
import React from "react";

function Register() {
  return (
    <>
      <div className="text-center mt-10">
        <h1 className="text-3xl mb-10">Register Page</h1>
        <div>
          <TextField id="standard-basic" label="username" variant="standard" />
        </div>
        <div className="my-10">
          <TextField
            id="standard-basic"
            label="password"
            type="password"
            variant="standard"
          />
        </div>
        <Button variant="contained" sx={{ width: "10rem" }}>
          Register
        </Button>
      </div>
    </>
  );
}

export default Register;
