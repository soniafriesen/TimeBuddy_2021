import React, { useReducer, useEffect, useState } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "../theme";
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
const GRAPHURL = "http://localhost:5000/graphql";
const EmployeeInfo = (props) => {
  //employee fields, same as the db schema
  const initialState = {
    resArr: [],
    managerid: null,
    department: "",
    empid: null,
    firstname: "",
    lastname: "",
    email: "",
    dob: "",
  };
  //modal variables
  const [show, setShow] = useState(false);
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchEmployeeInfo();
  }, []);

  const empidChange = (e) => {
    setState({ empid: e.target.value });
  };
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
            "{ getallemployees{managerid,department,empid,firstname,lastname,email,dob,startdate}}",
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
      let response = null;
      let payload = null;
      //just a regular employee
      //add employee collection
      response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: ` mutation { addemployee (managerid: ${state.managerid}, department: "${state.department}", firstname: "${state.firstname}", lastname: "${state.lastname}", email: "${state.email}", dob: "${state.dob}")
                                 { managerid, department, firstname, lastname, email, dob,startdate  } } `,
        }),
      });
      payload = await response.json();
      props.dataFromChild(
        `added employee ${payload.data.addemployee.firstname}`
      );
      setState({
        managerid: 0,
        department: "",
        empid: 0,
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

  const updateEmployee = async () => {
    try {
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: ` mutation { updateemployee (empid: ${state.empid}, department: "${state.department}", lastname:"${state.lastname}", email: "${state.email}")
            { managerid, department, firstname, lastname, email, dob,startdate  }}`,
        }),
      });
      let payload = await response.json();
      props.dataFromChild(
        `Employee #${payload.data.updateemployee.empid}, ${payload.data.updateemployee.first} ${payload.data.updateemployee.lastname} updated!`
      );
      setState({
        emanagerid: 0,
        edepartment: "",
        eempid: 0,
        efirstname: "",
        elastname: "",
        eemail: "",
        edob: "",
      });
      fetchEmployeeInfo();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteEmployee = async () => {
    try {
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: `{ deleteemployee (empid: ${state.empid}) }`,
        }),
      });
      let payload = await response.json();
      props.dataFromChild(`${payload.data.deleteemployee}`);
      console.log(payload.data.deleteemployee);
      setState({
        managerid: 0,
        department: "",
        empid: 0,
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
  //modal
  const Modal = (props) => {
    if (!props.show) {
      return null;
    }

    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Enter ID to delete</h4>
          </div>
          <div className="modal-body" style={{ width: 200 }}>
            <TextField
              id="managerid-field"
              onChange={empidChange}
              value={state.empid}
              fullWidth
            />
          </div>
          <div className="modal-footer">
            <button onClick={deleteEmployee} className="deleteButton">
              DELETE
            </button>

            <button onClick={props.onClose} className="button">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Card>
        <Typography variant="h4" align="center">
          New Employee
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
                </TableRow>
                <TableRow key="fillable1">
                  <TableCell component="th" scope="row">
                    <TextField
                      id="managerid-field"
                      onChange={manageridOnChange}
                      value={state.managerid}
                      label="#### (0 manager)"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      id="department-field"
                      onChange={departmentOnChange}
                      value={state.department}
                      label="department"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      id="first-name-field"
                      onChange={firstnameOnChange}
                      value={state.firstname}
                      label="first name"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      id="last-name-field"
                      onChange={lastnameOnChange}
                      value={state.lastname}
                      label="last name"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      id="email-field"
                      onChange={emailOnChange}
                      value={state.email}
                      label="XX@XX.XX"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      id="dob-field"
                      onChange={dobOnChange}
                      value={state.dob}
                      label="YYYY-MM-DD"
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
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <Typography variant="h5" align="center">
            Current Employees
          </Typography>
          <div align="center">
            <TableRow key="headers1">
              <TableCell component="th" scope="row">
                ManagerId
              </TableCell>
              <TableCell component="th" scope="row">
                EmployeeId
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
            </TableRow>
            {state.resArr.map((row) => (
              <TableRow key={state.resArr.indexOf(row)}>
                <TableCell component="th" scope="row">
                  <TextField
                    id="row-manager-field"
                    value={row.managerid}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    id="row-empid-field"
                    value={row.empid}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    id="row-department-field"
                    value={row.department}
                    fullWidth
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    id="row-fname-field"
                    value={row.firstname}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    id="row-lastname-field"
                    value={row.lastname}
                    fullWidth
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField id="row-email-field" value={row.email} fullWidth />
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    id="row-email-field"
                    value={row.dob}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </TableCell>
                <TableCell component="th" scope="row" style={{ width: 200 }}>
                  <Button
                    style={{ color: "blue" }}
                    variant="contained"
                    onClick={updateEmployee}
                  >
                    EDIT
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </div>
          <div className="EmployeeInfo" align="center">
            <Button
              style={{ color: "red" }}
              variant="contained"
              onClick={() => setShow(true)}
            >
              DELETE EMP.
            </Button>
            <Modal onClose={() => setShow(false)} show={show} />
          </div>
        </CardContent>
      </Card>
    </MuiThemeProvider>
  );
};
export default EmployeeInfo;
