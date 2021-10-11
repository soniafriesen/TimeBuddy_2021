import React, { useReducer, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
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
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const GRAPHURL = "http://localhost:5000/graphql"; // ***  CHANGE OR REMOVE THIS CONSTANT TO WHATEVER THE GRAPHQL URL IS ***

const EmployeeInfo = (props) => {
  //employee fields, same as the db schema
  const initialState = {
    resArr: [],
    compname: "",
    managerid: null,
    department: "",
    empid: null,
    firstname: "",
    lastname: "",
    email: "",
    dob: "",
  };

  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchEmployeeInfo();
  }, []);

  const manageridOnChange = (e) => {
    setState({ managerid: e.target.value });
  };

  const departmentOnChange = (e) => {
    setState({ department: e.target.value });
  };

  const firstnameOnChange = (e) => {
    setState({ firstname: e.target.value });
  };

  const lastnameOnChange = (e) => {
    setState({ lastname: e.target.value });
  };

  const emailOnChange = (e) => {
    setState({ email: e.target.value });
  };

  const dobOnChange = (e) => {
    setState({ dob: e.target.value });
  };

  const fetchEmployeeInfo = async () => {
    try {
      props.dataFromChild("running setup...");
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query:
            "{ getallemployees{managerid,department,empid,firstname,lastname,dob,startdate}}",
        }),
      });
      let payload = await response.json();
      props.dataFromChild(
        `found ${payload.data.getallemployees.length} employees`
      );
      console.log(payload.data.getallemployees);
      setState({
        resArr: payload.data.getallemployees,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addEmployeeInfo = async () => {
    try {
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: ` mutation { addemployee (managerid: ${state.managerid}, department: "${state.department}", firstname: "${state.firstname}", lastname: "${state.lastname}", email: "${state.email}", dob: "${state.dob}")
                                 { managerid, department, firstname, lastname, email, dob,startdate  } } `,
        }),
      });
      let payload = await response.json();
      props.dataFromChild(
        `added info for ${payload.data.addemployee.firstname} project`
      );
      setState({
        compname: "",
        managerid: null,
        department: "",
        empid: null,
        firstname: "",
        lastname: "",
        email: "",
        dob: "",
      });
      fetchEmployeeInfo();
    } catch (error) {
      console.log(error);
    }
  };

  const updateEmployeeEmail = async () => {
    try {
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: ` mutation { updateemployeeemail (empid: Int, email: String)
                                { firstname, lastname, email } }`, //*** not sure how to edit this to work :| ***
        }),
      });
      setState({
        managerid: null,
        department: "",
        empid: null,
        firstname: "",
        lastname: "",
        email: "",
        dob: "",
      });
      fetchEmployeeInfo();
    } catch (error) {
      console.log(error);
    }
  };

  const updateEmployeeDepartment = async () => {
    try {
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: ` mutation { updateemployeedepartment (empid: Int, department: String)
                                { firstname, lastname, department } }`, //*** not sure how to edit this to work :| ***
        }),
      });
      setState({
        managerid: null,
        department: "",
        empid: null,
        firstname: "",
        lastname: "",
        email: "",
        dob: "",
      });
      fetchEmployeeInfo();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEmployee = async () => {
    //NYI
  };

  return (
    <MuiThemeProvider>
      <Card>
        <Typography variant="h4" align="center">
          Add New Employee
        </Typography>
        <CardContent>
          <TableContainer component={Paper}>
            <Table aria-label="member table">
              <TableBody>
                <TableRow key="headers1">
                  <TableCell component="th" scope="row">
                    Manager ID
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Department
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Email
                  </TableCell>
                </TableRow>
                {state.resArr.map((row) => (
                  <TableRow key={state.resArr.indexOf(row)}>
                    <TableCell component="th" scope="row">
                      {row.managerid}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.department}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.email}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow key="fillable1">
                  <TableCell component="th" scope="row">
                    <TextField
                      id="managerid-field"
                      onChange={manageridOnChange}
                      value={state.managerid}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      id="department-field"
                      onChange={departmentOnChange}
                      value={state.department}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      id="email-field"
                      onChange={emailOnChange}
                      value={state.email}
                      fullWidth
                    />
                  </TableCell>
                </TableRow>
                <TableRow key="headers2">
                  <TableCell component="th" scope="row">
                    First Name
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Last Name
                  </TableCell>
                  <TableCell component="th" scope="row">
                    DOB
                  </TableCell>
                </TableRow>
                {state.resArr.map((row) => (
                  <TableRow key={state.resArr.indexOf(row)}>
                    <TableCell component="th" scope="row">
                      {row.firstname}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.lastname}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.dob}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow key="fillable2">
                  <TableCell component="th" scope="row">
                    <TextField
                      id="first-name-field"
                      onChange={firstnameOnChange}
                      value={state.firstname}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      id="last-name-field"
                      onChange={lastnameOnChange}
                      value={state.lastname}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      id="dob-field"
                      onChange={dobOnChange}
                      value={state.dob}
                      fullWidth
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" style={{ width: 200 }}>
                    <Button
                      style={{ color: "green" }}
                      variant="contained"
                      onClick={addEmployeeInfo}
                    >
                      ADD EMP.
                    </Button>
                  </TableCell>
                  <TableCell component="th" scope="row" style={{ width: 200 }}>
                    <Button
                      style={{ color: "blue" }}
                      variant="contained"
                      onClick={updateEmployeeEmail}
                    >
                      EDIT EMAIL
                    </Button>
                  </TableCell>
                  <TableCell component="th" scope="row" style={{ width: 200 }}>
                    <Button
                      style={{ color: "blue" }}
                      variant="contained"
                      onClick={updateEmployeeDepartment}
                    >
                      EDIT DEPT.
                    </Button>
                  </TableCell>
                  <TableCell component="th" scope="row" style={{ width: 200 }}>
                    <Button
                      style={{ color: "red" }}
                      variant="contained"
                      onClick={deleteEmployee}
                    >
                      DELETE EMP.
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="h5" align="center">
            Employees
          </Typography>
          <div align="center">
            <Autocomplete
              key={state.reset}
              id="employee"
              options={state.resArr}
              getOptionLabel={(option) =>
                option.empNumber +
                " " +
                option.empName +
                "; Email: " +
                option.empEmail
              }
              style={{
                width: 350,
                height: 20,
                paddingTop: "2vh",
                paddingBottom: "10vh",
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="employee info"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
        </CardContent>
      </Card>
    </MuiThemeProvider>
  );
};
export default EmployeeInfo;
