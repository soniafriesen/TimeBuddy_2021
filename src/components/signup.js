import React from "react";
import { TextField, Button, Typography, CardContent } from "@material-ui/core";

export default function SignUp() {
  return (
    <CardContent>
      <Typography variant="h4" color="primary">
        Signup
      </Typography>

      <form
        style={{
          width: "85%",
          marginLeft: "10px",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "400px",
        }}
        align="center"
      >
        <div>
          <TextField
            fullWidth
            label="First Name"
            variant="standard"
            margin="dense"
            type="text"
            size="small"
            required
          />

          <TextField
            fullWidth
            label="Last Name"
            variant="standard"
            margin="dense"
            type="text"
            size="small"
            required
          />
          <TextField
            fullWidth
            label="Email"
            variant="standard"
            margin="dense"
            type="email"
            size="small"
            required
          />

          <TextField
            fullWidth
            label="Password"
            variant="standard"
            margin="dense"
            type="password"
            size="small"
            required
          />
        </div>

        <div>
          <Button
            style={{ marginTop: "20px" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Signup
          </Button>
        </div>
      </form>
    </CardContent>
  );
}
