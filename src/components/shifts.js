import makeAnimated from "react-select/animated";
import { getToken } from "./token";
import React, { useReducer, useEffect } from "react";
import {
  Card,
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
  Modal,
  Box,
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
  };

  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const animatedComponents = makeAnimated();

  const choseEmployee = (e) => {
    setState({ employeeChosen: true });
    findEmployee();
  };

  const findEmployee = async () => {
    try {
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: ` {getspecificemployee(empid:${state.employeeid}){managerid,department,empid,firstname,lastname,dob,email,startdate}}`,
        }),
      });
      let payload = await response.json();
      setState({
        emanagerid: payload.data.getspecificemployee.managerid,
        edepartment: payload.data.getspecificemployee.department,
        eempid: payload.data.getspecificemployee.empid,
        efirstname: payload.data.getspecificemployee.firstname,
        elastname: payload.data.getspecificemployee.lastname,
        eemail: payload.data.getspecificemployee.email,
        estartdate: payload.data.getspecificemployee.startdate,
        edob: payload.data.getspecificemployee.dob,
        editid: null,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onEmployeeIdChange = (e) => {
    setState({ employeeid: e.target.value });
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
                  {/* // TODO : display and update shifts here */}
                  {/* <TableRow key="headers2">
                    <TableCell component="th" scope="row">
                      Day
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Shift Start
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Shift End
                    </TableCell>
                  </TableRow> */}
                </TableBody>
              </Table>
              {/* Add Shifts Here */}
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
