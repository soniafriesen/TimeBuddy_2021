import React, { useState } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import Reorder from "@material-ui/icons/Reorder";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import Home from "./components/home";
import Signup from "./components/signup"
import ScheduleMeeting from "./components/schedulemeeting"
import {
  Toolbar,
  AppBar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from "@material-ui/core";
const App = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
          <MenuItem component={Link} to="/home" onClick={handleClose}>
            Home
          </MenuItem>
            <MenuItem component={Link} to="/signup" onClick={handleClose}>
              Signup
            </MenuItem>
            <MenuItem component={Link} to="/schedulemeeting" onClick={handleClose}>
              Schedule Meetings
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <div>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/home" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/schedulemeeting" component={ScheduleMeeting} />
      </div>
    </MuiThemeProvider>
  );
};
export default App;
