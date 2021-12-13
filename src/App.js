import React, { useReducer } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import Reorder from "@material-ui/icons/Reorder";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import theme from "./theme";
import Home from "./components/home";
import Login from "./components/login/login";
import ScheduleMeeting from "./components/schedulemeeting";
import Shifts from "./components/Shifts/shifts";
import EmployeeInfo from "./components/employee/ViewAddEmployee";
import TimeOffInfo from "./components/vacationtime/viewaddvaction";
import ShiftPool from "./components/Shifts/shiftpool";
import Emergency from "./components/emergency/emergency";
import { getToken } from "./components/token";
import {
  Toolbar,
  AppBar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Snackbar,
} from "@material-ui/core";
const App = () => {
  const initialState = {
    gotData: false,
    anchorEl: null,
    snackBarMsg: "",
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  const handleClick = (event) => {
    setState({ anchorEl: event.currentTarget });
  };

  const handleClose = () => {
    setState({ anchorEl: null });
  };

  const snackbarClose = () => {
    setState({ gotData: false });
  };

  const msgFromChild = (msg) => {
    setState({ snackBarMsg: msg, gotData: true });
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    window.location.reload(false);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            TimeBuddy
          </Typography>
          {getToken() ? (
            <div style={{ marginLeft: "30%" }}>
              {sessionStorage.getItem("token")}
              <Button
                style={{
                  backgroundColor: "transparent",
                  marginLeft: "00%",
                  color: "rgba(44, 214, 176, 1)",
                }}
                onClick={logout}
                color="primary"
                align="right"
              >
                Logout
              </Button>
            </div>
          ) : null}

          <IconButton
            onClick={handleClick}
            color="inherit"
            style={{ marginLeft: "auto", paddingRight: "1vh" }}
          >
            <Reorder />
          </IconButton>

          <Menu
            id="simple-menu"
            anchorEl={state.anchorEl}
            open={Boolean(state.anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to="/home" onClick={handleClose}>
              Home
            </MenuItem>
            {!getToken() ? (
              <div>
                <MenuItem component={Link} to="/login" onClick={handleClose}>
                  Login
                </MenuItem>
              </div>
            ) : null}

            {getToken() ? (
              <div>
                <MenuItem
                  component={Link}
                  to="/employees"
                  onClick={handleClose}
                >
                  Employees
                </MenuItem>
                <MenuItem component={Link} to="/meetings" onClick={handleClose}>
                  Meetings
                </MenuItem>
                <MenuItem component={Link} to="/shifts" onClick={handleClose}>
                  Shifts
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/shiftpool"
                  onClick={handleClose}
                >
                  Shift Pool
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/vacations"
                  onClick={handleClose}
                >
                  Time Off
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/emergency"
                  onClick={handleClose}
                >
                  Emergencies
                </MenuItem>
              </div>
            ) : null}
          </Menu>
        </Toolbar>
      </AppBar>
      <div>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/home" component={Home} />
        <Route
          path="/login"
          render={() => <Login dataFromChild={msgFromChild} />}
        />
        <Route path="/meetings" component={ScheduleMeeting} />
        <Route
          path="/shifts"
          render={() => <Shifts dataFromChild={msgFromChild} />}
        />
        <Route path="/shiftpool" component={ShiftPool} />
        <Route
          path="/employees"
          render={() => <EmployeeInfo dataFromChild={msgFromChild} />}
        />
        <Route
          path="/vacations"
          render={() => <TimeOffInfo dataFromChild={msgFromChild} />}
        />
        <Route
          path="/emergency"
          render={() => <Emergency dataFromChild={msgFromChild} />}
        />
      </div>
      <Snackbar
        open={state.gotData}
        message={state.snackBarMsg}
        autoHideDuration={3000}
        onClose={snackbarClose}
      />
    </MuiThemeProvider>
  );
};
export default App;
