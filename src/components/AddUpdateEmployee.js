import React, { useReducer, useEffect } from "react";
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
    startdate: "",
    dob: "",
    show: false,
    editid: null,
    emanagerid: null,
    edepartment: "",
    eempid: null,
    efirstname: "",
    elastname: "",
    eemail: "",
    estartdate: "",
    edob: "",
  };
  //modal variables
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

  const onidchange = (e) => {
    setState({ editid: e.target.value });
  };
  const setShow = (e) => {
    setState({ show: true });
    findEmployee();
  };
  const editdepartment = (e) => {
    setState({ edepartment: e.target.value });
  };
  const editlname = (e) => {
    setState({ elastname: e.target.value });
  };

  const editemail = (e) => {
    setState({ eemail: e.target.value });
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
        managerid: null,
        department: "",
        empid: 0,
        firstname: "",
        lastname: "",
        email: "",
        dob: "",
        editid: null,
      });
      fetchEmployeeInfo();
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
          query: ` {getspecificemployee(empid:${state.editid}){managerid,department,empid,firstname,lastname,dob,email,startdate}}`,
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
  const updateEmployee = async () => {
    try {
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: ` mutation { updateemployee (empid: ${state.eempid}, department: "${state.edepartment}", lastname:"${state.elastname}", email: "${state.eemail}")
            { managerid, department, firstname, lastname, email, dob,startdate  }}`,
        }),
      });
      let payload = await response.json();
      props.dataFromChild(
        `Employee #${payload.data.updateemployee.empid}, ${payload.data.updateemployee.first} ${payload.data.updateemployee.lastname} updated!`
      );
      setState({
        managerid: null,
        department: "",
        empid: 0,
        firstname: "",
        lastname: "",
        email: "",
        dob: "",
        editid: null,
        show: false,
        emanagerid: null,
        edepartment: "",
        eempid: null,
        efirstname: "",
        elastname: "",
        eemail: "",
        estartdate: "",
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
          query: `{ deleteemployee (empid: ${state.editid}) }`,
        }),
      });
      let payload = await response.json();
      props.dataFromChild(`${payload.data.deleteemployee}`);
      console.log(payload.data.deleteemployee);
      setState({
        managerid: null,
        department: "",
        empid: 0,
        firstname: "",
        lastname: "",
        email: "",
        dob: "",
        editid: null,
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
            <Typography variant="h4" align="center">
              Employee
            </Typography>
          </div>
          <div className="modal-body">
            <TableContainer component={Paper}>
              <Table aria-label="member table">
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
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      id="editempid-field"
                      value={state.eempid}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      id="editdepartment-field"
                      onChange={editdepartment}
                      value={state.edepartment}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      id="editfname-field"
                      value={state.efirstname}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      id="editlname-field"
                      onChange={editlname}
                      value={state.elastname}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      id="email-field"
                      onChange={editemail}
                      value={state.eemail}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField id="dob-field" value={state.edob} fullWidth />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      id="startdate-field"
                      value={state.estartdate}
                      fullWidth
                    />
                  </TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          </div>
          <div className="modal-footer">
            <button onClick={updateEmployee} className="deleteButton">
              Save
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
                  <TableCell component="th" scope="row" style={{ width: 200 }}>
                    <Button
                      style={{ color: "green" }}
                      variant="contained"
                      onClick={addEmployeeInfo}
                    >
                      ADD
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
                  {row.managerid}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.empid}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.department}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.firstname}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.lastname}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.email}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.dob}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.startdate}
                </TableCell>
              </TableRow>
            ))}
          </div>
          <div className="EmployeeInfo" align="center">
            <div style={{ width: 200 }}>
              <TextField
                id="edit-field"
                onChange={onidchange}
                value={state.editid}
                label="Enter employee id (xxxx)"
              />
            </div>
            <Button
              style={{ color: "blue" }}
              variant="contained"
              onClick={() => setShow({ show: true })}
            >
              EDIT
            </Button>
            <Button
              style={{ color: "red" }}
              variant="contained"
              onClick={deleteEmployee}
            >
              DELETE
            </Button>
            <br />
            <Modal
              onClose={() => setState({ show: false })}
              show={state.show}
            />
          </div>
        </CardContent>
      </Card>
    </MuiThemeProvider>
  );
};
export default EmployeeInfo;
