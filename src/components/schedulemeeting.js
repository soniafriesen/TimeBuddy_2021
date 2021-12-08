import React, { useReducer, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  CardContent,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "../theme";
import { getToken } from "./token";

const GRAPHURL = "http://localhost:5000/graphql";

export default function ScheduleMeeting() {
  //meeting fields, same as the db schema
  const initialState = {
    resArr: [],
    meetingId: 0,
    empid: 0,
    date: "",
    starttime: "",
    message: "",
    show: false,
    editid: "",
    payload: "",
  };

  //modal variables
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchMeetingInfo();
  }, []);

  const dateOnChange = (e) => {
    setState({ date: e.target.value });
  };

  const timeOnChange = (e) => {
    setState({ time: e.target.value });
  };

  const messageOnChange = (e) => {
    setState({ message: e.target.value });
  };

  const onidchange = (e) => {
    setState({ editid: e.target.value });
  };

  const fetchMeetingInfo = async () => {
    try {
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query:
            "{ getallmeetings{meetingid, empid, date, starttime, message}}",
        }),
      });
      let payload = await response.json();

      setState({
        resArr: payload.data.getallmeetings,
      });

      findEmployeeId();
    } catch (error) {
      console.log(error);
    }
  };

  const findEmployeeId = async () => {
    try {
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: ` {getemployeebyemail(email:"${getToken()}"){empid}}`,
        }),
      });
      let payload = await response.json();

      setState({ empid: payload.data.getemployeebyemail.empid });
    } catch (error) {
      console.log(error);
    }
  };

  const addMeetingInfo = async () => {
    try {
      let response = null;

      //add meeting collection
      response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: ` mutation { postameeting (empid: ${state.empid}, date: "${state.date}", starttime: "${state.time}", message: "${state.message}")
                               { empid, date, starttime, message } } `,
        }),
      });
      await response.json();

      setState({
        date: "",
        time: "",
        message: "",
      });

      fetchMeetingInfo();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMeeting = async () => {
    try {
      //delete meeting from database
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: `{ removemeeting (meetingid: ${state.editid}) }`,
        }),
      });
      let payload = await response.json();
      setState({
        editid: "",
      });

      fetchMeetingInfo();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Card>
        <CardContent  align="center">
          <Typography variant="h4" color="primary">
            Schedule Meeting
          </Typography>

          {getToken() ? (
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
                <Typography style={{ marginTop: "10px" }}>
                  Date
                  <input
                    style={{ margin: "10px", width: "120px" }}
                    label="Date"
                    variant="standard"
                    type="date"
                    margin="large"
                    required
                    id="date"
                    onChange={dateOnChange}
                    value={state.date}
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
                    id="time"
                    onChange={timeOnChange}
                    value={state.time}
                  />
                </Typography>
                <TextField
                  fullWidth
                  label="Message"
                  variant="standard"
                  margin="dense"
                  size="small"
                  required
                  id="message"
                  onChange={messageOnChange}
                  value={state.message}
                />
              </div>

              <div>
                <Button
                  style={{ marginTop: "20px" }}
                  color="primary"
                  variant="contained"
                  onClick={addMeetingInfo}
                  disabled={!state.date || !state.time || !state.message}
                >
                  ADD
                </Button>
              </div>

              <Typography
                color="primary"
                variant="h5"
                align="center"
                style={{ marginTop: "20px" }}
              >
                Current Meetings
              </Typography>
              <div align="center">
                <Table>
                  <TableBody>
                    <TableRow key="headers1">
                      <TableCell component="th" scope="row">
                        Meeting ID
                      </TableCell>
                      <TableCell component="th" scope="row">
                        Employee ID
                      </TableCell>
                      <TableCell component="th" scope="row">
                        Date
                      </TableCell>
                      <TableCell component="th" scope="row">
                        Time
                      </TableCell>
                      <TableCell component="th" scope="row">
                        Message
                      </TableCell>
                    </TableRow>
                    {state.resArr.map((row) => (
                      <TableRow key={state.resArr.indexOf(row)}>
                        <TableCell component="th" scope="row">
                          {row.meetingid}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.empid}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.date}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.starttime}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.message}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="MeetingInfo" align="center">
                <div style={{ width: "100%" }}>
                  <TextField
                    id="edit-field"
                    onChange={onidchange}
                    value={state.editid}
                    label="Enter meeting id for delete (xxxx)"
                  />
                </div>
                <Button
                  style={{ color: "red" }}
                  variant="outlined"
                  onClick={deleteMeeting}
                >
                  DELETE
                </Button>
                <br />
              </div>
            </form>
          ) : (
            <Typography color="secondary">Not logged in</Typography>
          )}
        </CardContent>
      </Card>
    </MuiThemeProvider>
  );
}
