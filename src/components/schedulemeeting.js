import React from "react";
import { TextField, Button, Typography, CardContent } from "@material-ui/core";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { getToken } from "./token";

export default function ScheduleMeeting() {
  const options = [
    { value: "employee1", label: "employee1" },
    { value: "employee2", label: "employee2" },
    { value: "employee3", label: "employee3" },
    { value: "employee4", label: "employee4" },
  ];
  const animatedComponents = makeAnimated();

  return (

    

    <CardContent>
      <Typography variant="h4" color="primary">
        Schedule Meeting
      </Typography>

      {getToken() ?

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
            label="Title"
            variant="standard"
            margin="dense"
            size="small"
            required
          />

          <Typography style={{ marginTop: "10px" }}>
            Date
            <input
              style={{ margin: "10px", width: "120px" }}
              label="Date"
              variant="standard"
              type="date"
              margin="large"
              required
            />
          </Typography>
          <Typography style={{ marginTop: "10px" }}>
            Time
            <input
              style={{ margin: "10px", width: "120px" }}
              label="Time"
              type="time"
              variant="standard"
              margin="dense"
              size="large"
              required
            />
          </Typography>

          <TextField
            fullWidth
            label="Estimated Length in Minutes"
            variant="standard"
            margin="dense"
            size="small"
            required
          />

          <TextField
            fullWidth
            label="Location"
            variant="standard"
            margin="dense"
            size="small"
            required
          />

          <TextField
            fullWidth
            label="Notes"
            variant="standard"
            margin="dense"
            size="small"
          />
        </div>

        <Typography
          color="primary"
          style={{ marginTop: "20px", marginBottom: "10px" }}
        >
          Employees
        </Typography>

        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          defaultValue={[options[0], options[1]]}
          isMulti
          options={options}
        />

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
:
<Typography color="secondary">Not logged in</Typography>}
    </CardContent>
  );
}
