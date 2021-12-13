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
import UpdateModal from "./UpdateShiftModal"; //update modal

const GRAPHURL = "http://localhost:5000/graphql";

const Shifts = (props) => {
  const initialState = {
    show: false,
    shiftsAdded: [],
    managerid: null,
    department: "",
    firstname: "",
    lastname: "",
    email: "",
    startdate: "",
    dob: "",
    employeeChosen: false,
    employeeid: "",
    employeeaddid: "",
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
    editid: null,
  };

  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchShiftInfo();
  }, []);

  const choseEmployee = (e) => {
    setState({ employeeChosen: true });
    findEmployee();
    fetchShiftInfo();
  };

  const addShift = async (e) => {
    try {
<<<<<<< HEAD
      console.log(
        `{addshift(empid:${state.employeeaddid},date:${state.shiftDate},starttime:${state.shiftStart},endtime:${state.shiftEnd}){shiftid,empid,date,starttime,endtime}}`
      );
=======
>>>>>>> 5559d3a5223c58f281e4a11304eee3a679483be9
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: `mutation {addshift(empid:${state.employeeaddid},date:"${state.shiftDate}",starttime:"${state.shiftStart}",endtime:"${state.shiftEnd}"){shiftid,empid,date,starttime,endtime}}`,
        }),
      });
      let payload = await response.json();
<<<<<<< HEAD
      // fetchShiftInfo();

      let shiftToAdd = {
        shiftid: 0,
        empid: state.employeeaddid,
        date: state.shiftDate,
        starttime: state.shiftStart,
        endtime: state.shiftEnd,
      };
      var joined = state.shifts.concat(shiftToAdd);
      setState({
        shifts: joined,
      });
      console.log(payload.data.addshift.shiftid);
=======
      fetchShiftInfo();
>>>>>>> 5559d3a5223c58f281e4a11304eee3a679483be9
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

<<<<<<< HEAD
      console.log(payload.data.getemployeebyID.managerid);
=======
>>>>>>> 5559d3a5223c58f281e4a11304eee3a679483be9
    } catch (error) {
      console.log(error);
    }
  };

  const onEmployeeIdChange = (e) => {
    setState({ employeeid: e.target.value });
  };

  const onEmployeeAddIdChange = (e) => {
    setState({ employeeaddid: e.target.value });
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
  const onDeleteIdChange = (e) => {
    setState({ editid: e.target.value });
  };

  const initialize = async () => {
    setState({ status: "update" });
    setShow(true);
  };
  const setShow = (e) => {
    setState({ show: true });
  };
  const fetchShiftInfo = async () => {
    setState({ show: false });
    try {
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: `{getallshifts{shiftid,empid,date,starttime,endtime}}`,
        }),
      });
      let payload = await response.json();

<<<<<<< HEAD
      console.log(payload.data.getallshifts);
=======
>>>>>>> 5559d3a5223c58f281e4a11304eee3a679483be9
      setState({
        shifts: payload.data.getallshifts.filter(
          (shift) => shift.empid === state.employeeid
        ),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteShift = async () => {
    try {
      //delete employee from database
      var response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: `{ deleteshift (shiftid: ${state.editid}) }`,
        }),
      });
      var payload = await response.json();

      fetchShiftInfo();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardContent>
      {getToken() ? (
        <form
          style={{
            marginLeft: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
          align="center"
        >
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
                      <TextField
                        style={{ margin: "10px", width: "120px" }}
                        fullWidth
                        label="Employee ID"
                        variant="standard"
                        margin="dense"
                        size="small"
                        onChange={onEmployeeAddIdChange}
                        required
                      />
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
            <Typography
              variant="h4"
              style={{ marginTop: "10px" }}
              align="center"
              color="primary"
            >
              Manage Shifts
            </Typography>
            <div
              style={{
                borderStyle: "solid",
                borderRadius: "70px",
                borderWidth: "1px",
                margin: "10px",
              }}
            >
              <div style={{ margintop: "50px" }}>
                <TextField
                  style={{ margin: "10px", width: "120px" }}
                  fullWidth
                  label="Employee ID"
                  variant="standard"
                  margin="dense"
                  size="small"
                  onChange={onEmployeeIdChange}
                  required
                />
                <Button
                  style={{ margin: "10px", width: "120px" }}
                  color="secondary"
                  variant="outlined"
                  onClick={() => choseEmployee({ employeeChosen: true })}
                >
                  View Shifts
                </Button>
              </div>
              <div style={{ margintop: "50px" }}>
                <Button
                  style={{ margin: "10px", width: "120px" }}
                  color="secondary"
                  variant="outlined"
                  onClick={initialize}
                >
                  Open Edit Shifts
                </Button>
                <TextField
                  id="edit-field"
                  onChange={onDeleteIdChange}
                  value={state.editid}
                  label="Delete Shift By Id #"
                />
                <Button
                  style={{ margin: "10px", width: "120px", color: "red" }}
                  variant="outlined"
                  onClick={deleteShift}
                >
                  Delete
                </Button>
                <UpdateModal onClose={fetchShiftInfo} show={state.show} />
              </div>
            </div>
            {state.employeeChosen && (
              <Typography variant="h4" color="primary">
                Showing Shifts For Employee #{state.employeeid}
              </Typography>
            )}
            <Typography
              variant="h4"
              style={{ margin: "10px", marginTop: "40px" }}
              align="center"
              color="primary"
            >
              View Shifts
            </Typography>
            <Table aria-label="member table">
              <TableBody>
                <TableRow key="headers1">
                  <TableCell component="th" scope="row">
                    Shift ID
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Employee ID
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
                      {row.empid}
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
        </form>
      ) : (
        <Typography color="secondary">Not logged in</Typography>
      )}
    </CardContent>
  );
};
export default Shifts;
