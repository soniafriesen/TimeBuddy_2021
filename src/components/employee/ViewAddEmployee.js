import React, { useReducer, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "../../theme";
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
import UpdateModal from "./UpdateEmployeeModal"; //update modal
const GRAPHURL = "http://localhost:5000/graphql";
const EmployeeInfo = (props) => {
  //employee fields, same as the db schema
  const initialState = {
    resArr: [],
    managerid: null,
    department: "",
    empid: 0,
    firstname: "",
    lastname: "",
    email: "",
    startdate: "",
    dob: "",
    show: false,
    editid: 0,
    payload: "",
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
      setState({
        resArr: payload.data.getallemployees,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const msgfromchild = async () => {
    setState({ show: false });
    props.dataFromChild(`updated Employee ${state.editid}`);
    fetchEmployeeInfo();
  };
  const addEmployeeInfo = async () => {
    try {
      let response = null;
      let payload = null;

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

      //give then a temperary login
      let min = Math.ceil(1001);
      let max = Math.floor(9999);
      let random = Math.floor(Math.random() * (max - min + 1)) + min;
      response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: ` mutation{addlogin(email:"${state.email}",password:"${random}"){email,password,datecreated}} `,
        }),
      });
      payload = await response.json();
      props.dataFromChild(`added login for ${payload.data.addlogin.email}`);
      setState({
        managerid: null,
        department: "",
        empid: 0,
        firstname: "",
        lastname: "",
        email: "",
        dob: "",
        editid: 0,
      });
      fetchEmployeeInfo();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteEmployee = async () => {
    try {
      //get employee info
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: `{getemployeebyID(empid:${state.editid}){managerid,department,empid,firstname,lastname,email,dob,startdate}}`,
        }),
      });
      let payload = await response.json();
      props.dataFromChild(`${payload.data.getemployeebyID.firstname}`);
      let UserEmail = payload.data.getemployeebyID.email;

      //delete their log in as well
      response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: `mutation{removelogin(email:"${UserEmail}")} `,
        }),
      });
      payload = await response.json();
      props.dataFromChild(`${payload.data.removelogin}`);

      //delete employee from database
      response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: `{ deleteemployee (empid: ${state.editid}) }`,
        }),
      });
      payload = await response.json();
      props.dataFromChild(`${payload.data.deleteemployee}`);
      
      setState({
        managerid: null,
        department: "",
        empid: 0,
        firstname: "",
        lastname: "",
        email: "",
        dob: "",
        editid: 0,
      });
      fetchEmployeeInfo();
    } catch (error) {
      console.log(error);
    }
  };
  const initialize = async () => {
    setState({ status: "update" });
    setShow(true);
  };
  return (
    <MuiThemeProvider theme={theme}>
      <Card>
        <Typography
          variant="h4"
          style={{ marginTop: "10px" }}
          align="center"
          color="primary"
        >
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
                      required
                      onChange={manageridOnChange}
                      value={state.managerid}
                      label="#### (0 manager)"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      id="department-field"
                      required
                      onChange={departmentOnChange}
                      value={state.department}
                      label="department"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      id="first-name-field"
                      required
                      onChange={firstnameOnChange}
                      value={state.firstname}
                      label="first name"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      id="last-name-field"
                      required
                      onChange={lastnameOnChange}
                      value={state.lastname}
                      label="last name"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      id="email-field"
                      required
                      onChange={emailOnChange}
                      value={state.email}
                      label="XX@XX.XX"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <input
                      style={{ margin: "10px", width: "120px" }}
                      fullWidth
                      label="Date"
                      variant="standard"
                      type="date"
                      margin="large"
                      onChange={dobOnChange}
                      value={state.dob}
                      required
                    />
                  </TableCell>
                  <TableCell component="th" scope="row" style={{ width: 200 }}>
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={addEmployeeInfo}
                      disabled={
                        !state.managerid ||
                        !state.department ||
                        !state.firstname ||
                        !state.lastname ||
                        !state.dob ||
                        !state.email
                      }
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
            <Table>
              <TableBody>
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
                  <TableCell component="th" scope="row">
                    Start date
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
              </TableBody>
            </Table>
          </div>
          <div className="EmployeeInfo" align="center">
            <div style={{ width: "100%" }}>
              <TextField
                id="edit-field"
                onChange={onidchange}
                value={state.editid}
                label="Enter id for delete (xxxx)"
              />
            </div>
            <Button color="secondary" variant="outlined" onClick={initialize}>
              EDIT
            </Button>
            <Button
              style={{ color: "red" }}
              variant="outlined"
              onClick={deleteEmployee}
            >
              DELETE
            </Button>
            <br />
            <UpdateModal
              onClose={() => setState({ show: false })}
              show={state.show}
              refresh={msgfromchild}
            />
          </div>
        </CardContent>
      </Card>
    </MuiThemeProvider>
  );
};
export default EmployeeInfo;
