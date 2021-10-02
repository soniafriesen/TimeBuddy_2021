import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import {
  Toolbar,
  Card,
  AppBar,
  CardHeader,
  CardContent,
  Typography,
} from "@material-ui/core";
import theme from "./theme";
const Home = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <AppBar color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            TimeBuddy 2021
          </Typography>
        </Toolbar>
      </AppBar>
      <Card style={{ marginTop: "20%" }}>
        <CardHeader title="Home Page" style={{ textAlign: "center" }} />
        <CardContent>Home</CardContent>
      </Card>
    </MuiThemeProvider>
  );
};
export default Home;
