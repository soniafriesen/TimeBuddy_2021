import React, { useReducer } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import Reorder from "@material-ui/icons/Reorder";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";
import ScheduleMeeting from "./components/schedulemeeting";
import EmployeeInfo from "./components/AddUpdateEmployee";
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
  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            TimeBuddy
          </Typography>
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
            <MenuItem component={Link} to="/login" onClick={handleClose}>
              Login
            </MenuItem>
            <MenuItem component={Link} to="/signup" onClick={handleClose}>
              Signup
            </MenuItem>
            <MenuItem
              component={Link}
              to="/schedulemeeting"
              onClick={handleClose}
            >
              Schedule Meetings
            </MenuItem>
            <MenuItem component={Link} to="/employees" onClick={handleClose}>
              Employees
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <div>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/schedulemeeting" component={ScheduleMeeting} />
        <Route
          path="/employees"
          render={() => <EmployeeInfo dataFromChild={msgFromChild} />}
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
