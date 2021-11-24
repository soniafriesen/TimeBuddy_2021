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
export const ForgetPassword = (props) => {
  //employee fields, same as the db schema
  const initialState = {
    email: "",
    password: "",
    msg: "Password Changed!",
    showMessage: false,
    show: props.show,
  };
  //modal variables
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  const emailOnChange = (e) => {
    setState({ email: e.target.value });
  };
  const onPasswordChange = (e) => {
    setState({ password: e.target.value });
  };
  const resetPassword = async () => {
    try {
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: ` mutation{changepassword(email:"${state.email}", password:"${state.password}"){email,password,datecreated}}`,
        }),
      });
      let payload = await response.json();
      console.log(payload);
      setState({ showMessage: true });
      setState({
        email: "",
        password: "",
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
          width: 500,
        }}
      >
        <TableContainer component={Paper}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h1"
            align="center"
            color="primary"
          >           
          </Typography>
          <Table aria-label="member table">
            <TableBody>
              <TableRow key="headers1">
                <TableCell component="th" scope="row" align="center">
                  <Typography component="h1" variant="h4" color="primary">
                    Email
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow key="headers2">
                <TableCell component="th" scope="row">
                  <TextField
                    id="email-field"
                    onChange={emailOnChange}
                    value={state.email}
                    required
                    fullWidth
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" align="center">
                  <Typography component="h1" variant="h4" color="primary">
                    Password
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <TextField
                    id="password-field"
                    onChange={onPasswordChange}
                    value={state.password}
                    type="password"
                    required
                    fullWidth
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <div align="center">
                    <Button
                      onClick={resetPassword}
                      variant="outlined"
                      style={{
                        color: theme.palette.secondary.main,
                      }}
                      disabled={!state.email || !state.password}
                      className="updateButton"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={props.onClose}
                      variant="outlined"
                      style={{ color: "red" }}
                      className="button"
                    >
                      Cancel
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};
