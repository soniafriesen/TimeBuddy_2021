import React from "react";
import { TextField, Button, Typography, CardContent } from "@material-ui/core";

export default function ScheduleMeeting() {
  return (
    <CardContent>
      <Typography variant="h4" style={{ marginBottom: "0px", marginLeft: "0%" }} color="primary">
        Login
      </Typography>

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
            SUBMIT
          </Button>
        </div>
      </form>
    </CardContent>
  );
}
