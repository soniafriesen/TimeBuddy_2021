import { getToken } from "./token";
import React, { useReducer, useEffect } from "react";
import {
  CardContent,
  TextField,
  Table,
  TableContainer,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  Button,
  Typography,
} from "@material-ui/core";
const GRAPHURL = "http://localhost:5000/graphql";

const Shifts = (props) => {
  const initialState = {
    managerid: null,
    department: "",
    firstname: "",
    lastname: "",
    email: "",
    startdate: "",
    dob: "",
    employeeChosen: false,
    employeeid: "",
    emanagerid: null,
    edepartment: "",
    eempid: null,
    efirstname: "",
    elastname: "",
    eemail: "",
    estartdate: "",
    edob: "",
    shiftDate: "",
    shiftStart: "",
    shiftEnd: "",
    shifts: [],
    employeeShifts: [],
    found: false,
  };

  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchShiftInfo();
  }, []);

  const choseEmployee = (e) => {
    setState({ employeeChosen: true });
    fetchShiftInfo();
    findEmployee();
  };

  const addShift = async (e) => {
    try {
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: `mutation {addshift(empid:${state.employeeid},date:"${state.shiftDate}",starttime:"${state.shiftStart}",endtime:"${state.shiftEnd}"){shiftid,empid,date,starttime,endtime}}`,
        }),
      });
      let payload = await response.json();
      fetchShiftInfo();
    } catch (error) {
      console.log(error);
    }
  };

  const findEmployee = async () => {
    try {
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: `{getemployeebyID(empid:${state.employeeid}){managerid,department,empid,firstname,lastname,email,dob,startdate}}`,
        }),
      });
      let payload = await response.json();
      setState({
        emanagerid: payload.data.getemployeebyID.managerid,
        edepartment: payload.data.getemployeebyID.department,
        eempid: payload.data.getemployeebyID.empid,
        efirstname: payload.data.getemployeebyID.firstname,
        elastname: payload.data.getemployeebyID.lastname,
        eemail: payload.data.getemployeebyID.email,
        estartdate: payload.data.getemployeebyID.startdate,
        edob: payload.data.getemployeebyID.dob,
        editid: null,
        found: true,
      });

    } catch (error) {
      console.log(error);
    }
  };

  const onEmployeeIdChange = (e) => {
    setState({ employeeid: e.target.value });
  };

  const onShiftDateChange = (e) => {
    setState({ shiftDate: e.target.value });
  };

  const onShiftStartChange = (e) => {
    setState({ shiftStart: e.target.value });
  };

  const onShiftEndChange = (e) => {
    setState({ shiftEnd: e.target.value });
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
        shifts: payload.data.getallshifts.filter(
          (shift) => shift.empid === state.employeeid
        ),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardContent>
      <Typography variant="h4" color="primary">
        Find/Update Employee's Shifts
      </Typography>

      {getToken() ? (
        <form
          style={{
            marginLeft: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
          align="center"
        >
          {!state.employeeChosen && (
            <div>
              <TextField
                fullWidth
                label="Employee ID"
                variant="standard"
                margin="dense"
                size="small"
                onChange={onEmployeeIdChange}
                required
              />
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => choseEmployee({ employeeChosen: true })}
              >
                Find Employee
              </Button>{" "}
            </div>
          )}
          {state.employeeChosen && (
            <div>
              <Typography
                variant="h4"
                style={{ marginTop: "10px" }}
                align="center"
                color="primary"
              >
                Add A New Shift
              </Typography>
              <CardContent>
                <TableContainer component={Paper}>
                  <Table aria-label="member table">
                    <TableBody>
                      <TableRow key="headers1">
                        <TableCell component="th" scope="row">
                          Date
                        </TableCell>
                        <TableCell component="th" scope="row">
                          Start Time
                        </TableCell>
                        <TableCell component="th" scope="row">
                          End Time
                        </TableCell>
                      </TableRow>
                      <TableRow key="fillable1">
                        <TableCell component="th" scope="row">
                          <input
                            style={{ margin: "10px", width: "120px" }}
                            fullWidth
                            label="Date"
                            variant="standard"
                            type="date"
                            margin="large"
                            onChange={onShiftDateChange}
                            value={state.sfiftDate}
                            required
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <TextField
                            id="start-time-field"
                            required
                            onChange={onShiftStartChange}
                            value={state.shiftStart}
                            label="Start Time"
                            fullWidth
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <TextField
                            id="end-time-field"
                            required
                            onChange={onShiftEndChange}
                            value={state.shiftEnd}
                            label="End Time"
                            fullWidth
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ width: 200 }}
                        >
                          <Button
                            color="primary"
                            variant="outlined"
                            onClick={addShift}
                            disabled={
                              !state.shiftDate ||
                              !state.shiftStart ||
                              !state.shiftEnd
                            }
                          >
                            ADD
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>

              <Typography variant="h4" color="primary">
                Employee Found!
              </Typography>
              <Table aria-label="member table">
                <TableBody>
                  <TableRow key="headers1">
                    <TableCell component="th" scope="row">
                      Manager ID
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Employee ID
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Department
                    </TableCell>
                    <TableCell component="th" scope="row">
                      First Name
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Last Name
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Email
                    </TableCell>
                    <TableCell component="th" scope="row">
                      DOB
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Start Date
                    </TableCell>
                  </TableRow>
                  <TableRow key="headers2">
                    <TableCell component="th" scope="row">
                      <TextField
                        id="editmanagerid-field"
                        value={state.emanagerid}
                        fullWidth
                        disabled="true"
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <TextField
                        id="editempid-field"
                        value={state.eempid}
                        fullWidth
                        disabled="true"
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <TextField
                        id="editdepartment-field"
                        value={state.edepartment}
                        fullWidth
                        disabled="true"
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <TextField
                        id="editfname-field"
                        value={state.efirstname}
                        fullWidth
                        disabled="true"
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <TextField
                        id="editlname-field"
                        value={state.elastname}
                        fullWidth
                        disabled="true"
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <TextField
                        id="email-field"
                        value={state.eemail}
                        fullWidth
                        disabled="true"
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <TextField
                        id="dob-field"
                        value={state.edob}
                        fullWidth
                        disabled="true"
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <TextField
                        id="startdate-field"
                        value={state.estartdate}
                        fullWidth
                        disabled="true"
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table aria-label="member table">
                <TableBody>
                  <TableRow key="headers1">
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
          )}
        </form>
      ) : (
        <Typography color="secondary">Not logged in</Typography>
      )}
    </CardContent>
  );
};
export default Shifts;
