import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import theme from "../theme";
const Home = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Card>
        <CardHeader
          title="TimeBuddy"
          style={{ color: theme.palette.primary.main, textAlign: "center" }}
        />
        <CardContent>
          <br />
          <Typography
            color="primary"
            style={{ float: "right", paddingRight: "1vh", fontSize: "smaller" }}
          >
            &copy;Immersive NERDS
          </Typography>
        </CardContent>
      </Card>
    </MuiThemeProvider>
  );
};
export default Home;
