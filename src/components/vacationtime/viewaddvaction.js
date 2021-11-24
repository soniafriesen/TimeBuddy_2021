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
import UpdateModal from "./updatevactionmodal"; //update modal
const GRAPHURL = "http://localhost:5000/graphql";
const VacationTime = (props) => {
  //timeoff fields, same as the db schema
  const initialState = {
    resArr: [],
    empid: null,
    startdate: "",
    enddate: "",
    description: "",
    requestdate: "",
    approved: "",
    edittoid: null,
    show: false,
  };
  //modal variables
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchTimeOffInfo();
  }, []);

  const employeeidOnChange = (e) => {
    setState({ empid: e.target.value });
  };

  const startdateOnChange = (e) => {
    setState({ startdate: e.target.value });
  };

  const enddateOnChange = (e) => {
    setState({ enddate: e.target.value });
  };

  const descriptionOnChange = (e) => {
    setState({ description: e.target.value });
  };
  const onidchange = (e) => {
    setState({ edittoid: e.target.value });
  };
  const setShow = (e) => {
    setState({ show: true });
  };
  const fetchTimeOffInfo = async () => {
    try {
      props.dataFromChild("running setup...");
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query:
            "{ getalltimeoff{toid,empid,startdate,enddate,description,requestdate,approved}}",
        }),
      });
      let payload = await response.json();
      props.dataFromChild(
        `found ${payload.data.getalltimeoff.length} vacations`
      );
      console.log(payload.data.getalltimeoff);
      setState({
        resArr: payload.data.getalltimeoff,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const msgfromchild = async () => {
    setState({ show: false });
    props.dataFromChild(`updated Vacation Time ${state.editid}`);
    fetchTimeOffInfo();
  };
  const addTimeOff = async () => {
    try {
      let response = null;
      let payload = null;
      let timeoff = parseInt(state.empid);
      //add TimeOff collection
      response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: ` mutation{addtimeoff(empid:${timeoff},startdate:"${state.startdate}",enddate:"${state.enddate}",description:"${state.description}")
          {toid,empid,startdate,enddate,description,requestdate,approved}}`,
        }),
      });
      payload = await response.json();
      props.dataFromChild(
        `added vacation for employee #${payload.data.addtimeoff.empid}`
      );
      setState({
        empid: null,
        startdate: "",
        enddate: "",
        description: "",
        requestdate: "",
        approved: "",
        edittoid: null,
      });
      fetchTimeOffInfo();
    } catch (error) {
      console.log(error);
    }
  };
  const cancelTimeOff = async () => {
    try {
      //get employee info
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: `{canceltimeoff(toid:${state.edittoid})}`,
        }),
      });
      let payload = await response.json();
      props.dataFromChild(`${payload.data.canceltimeoff}`);
      console.log(payload.data.canceltimeoff);
      setState({
        empid: null,
        startdate: "",
        enddate: "",
        description: "",
        requestdate: "",
        approved: "",
        edittoid: null,
      });
      fetchTimeOffInfo();
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
          Request Vacation Time
        </Typography>
        <CardContent>
          <TableContainer component={Paper}>
            <Table aria-label="member table">
              <TableBody>
                <TableRow key="headers1">
                  <TableCell component="th" scope="row">
                    Employee ID
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Start Date
                  </TableCell>
                  <TableCell component="th" scope="row">
                    End Date
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Description
                  </TableCell>
                </TableRow>
                <TableRow key="fillable1">
                  <TableCell component="th" scope="row">
                    <TextField
                      id="employeeid-field"
                      required
                      onChange={employeeidOnChange}
                      value={state.empid}
                      label="####"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <input
                      style={{ margin: "10px", width: "120px" }}
                      fullWidth
                      label="Start Date"
                      variant="standard"
                      type="date"
                      margin="large"
                      onChange={startdateOnChange}
                      value={state.startdate}
                      required
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <input
                      style={{ margin: "10px", width: "120px" }}
                      fullWidth
                      label="End Date"
                      variant="standard"
                      type="date"
                      margin="large"
                      onChange={enddateOnChange}
                      value={state.enddate}
                      required
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      id="description-field"
                      required
                      onChange={descriptionOnChange}
                      value={state.description}
                      label="Description"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell component="th" scope="row" style={{ width: 200 }}>
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={addTimeOff}
                      disabled={
                        !state.empid ||
                        !state.startdate ||
                        !state.enddate ||
                        !state.description
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
            Current Times Off
          </Typography>
          <div align="center">
            <Table>
              <TableBody>
                <TableRow key="headers1">
                  <TableCell component="th" scope="row">
                    Time Off ID
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Employee ID
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Start Date
                  </TableCell>
                  <TableCell component="th" scope="row">
                    End Date
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Description
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Request Date
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Approval
                  </TableCell>
                </TableRow>
                {state.resArr.map((row) => (
                  <TableRow key={state.resArr.indexOf(row)}>
                    <TableCell component="th" scope="row">
                      {row.toid}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.empid}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.startdate}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.enddate}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.description}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.requestdate}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.approved}
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
                value={state.toid}
                label="Enter id to remove (xxxx)"
              />
            </div>
            <Button color="secondary" variant="outlined" onClick={initialize}>
              EDIT
            </Button>
            <Button
              style={{ color: "red" }}
              variant="outlined"
              onClick={cancelTimeOff}
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
export default VacationTime;
