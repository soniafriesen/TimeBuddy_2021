import React, { useState } from "react";
import { TextField, Button, Typography, CardContent } from "@material-ui/core";
import { getToken } from "./token";

export default function ScheduleMeeting() {

    function login() {
        if(email && password) {
            console.log("logging in");
        const userToken = {"token":"test"};
        sessionStorage.setItem('token', JSON.stringify(userToken));
        getToken();
    }
      }

      const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <CardContent>
      <Typography variant="h4" color="primary">
        Login
      </Typography>

      {!getToken() ?

      <form
        style={{
          width: "85%",
          marginLeft: "10px",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "400px"
        }}
        align="center"
      >
        <div>
          <TextField
            fullWidth
            label="Email"
            variant="standard"
            margin="dense"
            type="email"
            size="small"
            required
            onChange={e => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            variant="standard"
            margin="dense"
            type="password"
            size="small"
            required
            onChange={e => setPassword(e.target.value)}
          />

        </div>

        <div>
          <Button
          onClick={() => login()}
          style={{ marginTop: "20px" }}
          variant="contained"
          color="primary"
          type="submit"
          >
            LOGIN
          </Button>
        </div>
      </form>
:
<Typography color="secondary">Logged in</Typography>}
    </CardContent>
  );
}
