import React, { useReducer, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "../../theme";
import { getToken } from "../token";
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
const GRAPHURL = "http://localhost:5000/graphql";
const EmergencyInfo = (props) => {
  //employee fields, same as the db schema
  const initialState = {
    resArr: [],
    emergencyid: null,
    empid: null,
    date: "",
    description: "",
  };
  //modal variables
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const options = ["Family", "Medical", "Personal"];

  const onChange = (e, selectedOption) => {
    selectedOption
      ? setState({ description: selectedOption })
      : setState({ description: "" });
  };
  useEffect(() => {
    fetchEmergencyInfo();
  }, []);

  const fetchEmergencyInfo = async () => {
    try {
      props.dataFromChild("running setup...");
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: "{ getallemergencies{emergid,empid,description,date}}",
        }),
      });
      let payload = await response.json();
      props.dataFromChild(
        `found ${payload.data.getallemergencies.length} emergencies`
      );
      setState({
        resArr: payload.data.getallemergencies,
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
    } catch (error) {
      console.log(error);
    }
  };
  const declareEmergencyInfo = async () => {
    try {
      let response = null;
      let payload = null;
      //add emergency collection
      response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: ` mutation{addemergency(empid:${state.empid},description:"${state.description}"){emergid,empid,description,date}} `,
        }),
      });
      payload = await response.json();
      props.dataFromChild(
        `emergency declarede for employee ${payload.data.addemergency.empid}`
      );
      setState({ date: "", description: "" });
      fetchEmergencyInfo();
    } catch (error) {
      console.log(error);
    }
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
          Declare Emergency
        </Typography>
        <CardContent>
          <TableContainer component={Paper}>
            <Table aria-label="member table">
              <TableBody>
                <TableRow key="headers1">
                  <TableCell component="th" scope="row">
                    <div align="center">Employee ID</div>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <div align="center">Description</div>
                  </TableCell>
                  <TableCell component="th" scope="row" />
                </TableRow>
                <TableRow key="fillable1">
                  <TableCell component="th" scope="row">
                    <div align="center">
                      <TextField
                        id="employeeid-field"
                        required
                        value={state.empid}
                      />
                    </div>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <div align="center">
                      <Autocomplete
                        onChange={onChange}
                        options={options}
                        getOptionLabel={(option) => option}
                        style={{
                          width: 350,
                          height: 20,
                          paddingTop: "2vh",
                          paddingBottom: "10vh",
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="descriptions"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      />
                    </div>
                  </TableCell>
                  <TableCell component="th" scope="row" style={{ width: 200 }}>
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={declareEmergencyInfo}
                      disabled={!state.empid || !state.description}
                    >
                      Declare
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <Typography variant="h5" align="center">
            Declared Emergencies
          </Typography>
          <div align="center">
            <Table>
              <TableBody>
                <TableRow key="headers1">
                  <TableCell component="th" scope="row">
                    EmergencyId
                  </TableCell>
                  <TableCell component="th" scope="row">
                    EmployeeId
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Description
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Date
                  </TableCell>
                </TableRow>
                {state.resArr.map((row) => (
                  <TableRow key={state.resArr.indexOf(row)}>
                    <TableCell component="th" scope="row">
                      {row.emergid}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.empid}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.description}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </MuiThemeProvider>
  );
};
export default EmergencyInfo;
