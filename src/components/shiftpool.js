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

export default function ShiftPool() {

  const initialState = {
    empid:0,
    shifts: [],
    allshifts: [],
    addid:"",
    takeid:"",
    shiftsinpool: []
  };

  //modal variables
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchShiftInfo();
    fetchShiftsInPool();
  }, []);

  const onaddidchange = (e) => {
    setState({ addid: e.target.value });
  };

  const ontakeidchange = (e) => {
    setState({ takeid: e.target.value });
  };

  const fetchShiftInfo = async () => {
    try {
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: `{getallshifts{shiftid,empid,date,starttime,endtime}}`,
        }),
      });
      let payload = await response.json();

      setState({
        allshifts:payload.data.getallshifts
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
      
      let filteredshifts = state.allshifts.filter(
            (shift) => shift.empid == state.empid
          );
      setState({
          shifts:filteredshifts
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchShiftsInPool = async () => {
    try {
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: `{getallinpool(shiftid,date,starttime,endtime}} }`,
        }),
      });
      let payload = await response.json();

      setState({
        shiftsinpool:payload.data.getallinpool
      });

    } catch (error) {
      console.log(error);
    }
  };

  const addShiftToPool = async () => {
      //do
  }

  const takeShiftFromPool = async () => {
      //do
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Card>
        <CardContent  align="center">
          <Typography variant="h4" color="primary">
            Shift Pool
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

              <Typography
                color="primary"
                variant="h5"
                align="center"
                style={{ marginTop: "20px" }}
              >
                Current Shifts
              </Typography>
                <div>
                <Table aria-label="member table">
                <TableBody>
                  <TableRow key="headers1">
                    <TableCell component="th" scope="row">
                      Shift ID
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Day
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Shift Start
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Shift End
                    </TableCell>
                  </TableRow>
                  {state.shifts.map((row) => (
                    <TableRow key={state.shifts.indexOf(row)}>
                    <TableCell component="th" scope="row">
                      {row.shiftid}
                    </TableCell>
                      <TableCell component="th" scope="row">
                        {row.date}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.starttime}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.endtime}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>

              <div align="center">
                <div style={{ width: "100%" }}>
                  <TextField
                    id="edit-field"
                    onChange={onaddidchange}
                    value={state.addid}
                    label="Enter shift id"
                  />
                </div>
                <Button
                  style={{ color: "blue" }}
                  variant="outlined"
                  onClick={addShiftToPool}
                >
                  ADD TO POOL
                </Button>
                <br />
              </div>

              <Typography
                color="primary"
                variant="h5"
                align="center"
                style={{ marginTop: "20px" }}
              >
                Shifts in Pool
              </Typography>
              <div>
                <Table aria-label="member table">
                <TableBody>
                  <TableRow key="headers1">
                    <TableCell component="th" scope="row">
                      Shift ID
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Day
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Shift Start
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Shift End
                    </TableCell>
                  </TableRow>
                  {state.shiftsinpool.map((row) => (
                    <TableRow key={state.shifts.indexOf(row)}>
                    <TableCell component="th" scope="row">
                      {row.shiftid}
                    </TableCell>
                      <TableCell component="th" scope="row">
                        {row.date}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.starttime}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.endtime}
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
                    onChange={ontakeidchange}
                    value={state.takeid}
                    label="Enter shift id to take"
                  />
                </div>
                <Button
                  style={{ color: "blue" }}
                  variant="outlined"
                  onClick={takeShiftFromPool}
                >
                  TAKE FROM POOL
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
