import React, { useReducer } from "react";
import theme from "../../theme";
import {
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
//modal
const UpdateEmployeeModal = (props) => {
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
    editid: null,    
    show: props.show,
  };
  //modal variables
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  const manageridOnChange = (e) => {
    setState({ managerid: e.target.value });
  };

  const departmentOnChange = (e) => {
    setState({ department: e.target.value });
  };

  const lastnameOnChange = (e) => {
    setState({ lastname: e.target.value });
  };

  const emailOnChange = (e) => {
    setState({ email: e.target.value });
  };
  const editOnchange = (e) => {
    setState({ editid: e.target.value });
  };
  const findEmployee = async () => {
    try {
      let employee = parseInt(state.editid);
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: ` {getspecificemployee(empid:${employee}){managerid,department,empid,firstname,lastname,dob,email,startdate}}`,
        }),
      });
      let payload = await response.json();
      setState({
        managerid: payload.data.getspecificemployee.managerid,
        department: payload.data.getspecificemployee.department,
        empid: payload.data.getspecificemployee.empid,
        firstname: payload.data.getspecificemployee.firstname,
        lastname: payload.data.getspecificemployee.lastname,
        email: payload.data.getspecificemployee.email,
        dob: payload.data.getspecificemployee.dob,
        startdate: payload.data.getspecificemployee.startdate,
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
          query: ` mutation { updateemployee (managerid: ${state.managerid}, empid: ${state.empid}, department: "${state.department}", lastname:"${state.lastname}", email: "${state.email}")
            { managerid, department, firstname, lastname, email, dob,startdate  }}`,
        }),
      });
      let payload = await response.json();
      setState({
        managerid: null,
        department: "",
        empid: 0,
        firstname: "",
        lastname: "",
        email: "",
        dob: "",
        show: props.onClose,
      });
      props.refresh(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (!props.show) {
    return null;
  }

  return (
    <Modal
      open={props.show}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1100,
          height: 100,
        }}
      >
        <TableContainer component={Paper}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
          >
            Employee
          </Typography>
          <Table aria-label="member table">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <TextField
                    id="find-field"
                    value={state.editid}
                    onChange={editOnchange}
                    fullWidth
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <Button
                    onClick={findEmployee}
                    variant="outlined"
                    style={{ color: "blue" }}
                    className="Findbutton"
                  >
                    Find
                  </Button>
                </TableCell>
              </TableRow>
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
                    onChange={manageridOnChange}
                    value={state.managerid}
                    fullWidth
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    id="editempid-field"
                    value={state.empid}
                    fullWidth
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    id="editdepartment-field"
                    onChange={departmentOnChange}
                    value={state.department}
                    fullWidth
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    id="editfname-field"
                    value={state.firstname}
                    fullWidth
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    id="editlname-field"
                    onChange={lastnameOnChange}
                    value={state.lastname}
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
                <TableCell component="th" scope="row">
                  <TextField id="dob-field" value={state.dob} fullWidth />
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    id="startdate-field"
                    value={state.startdate}
                    fullWidth
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell component="th" scope="row">
                  <Button
                    onClick={updateEmployee}
                    variant="outlined"
                    style={{
                      color: theme.palette.secondary.main,
                    }}
                    className="updateButton"
                  >
                    Save
                  </Button>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Button
                    onClick={props.onClose}
                    variant="outlined"
                    style={{ color: "red" }}
                    className="button"
                  >
                    Close
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};
export default UpdateEmployeeModal;
