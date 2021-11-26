import React, { useReducer } from "react";
import { TextField, Button, Typography, CardContent,Card } from "@material-ui/core";
import { getToken } from "../token";
import { ForgetPassword } from "./ForgetPassword";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "../../theme";
const GRAPHURL = "http://localhost:5000/graphql";

const LoginPage = (props) => {
  const initialState = {
    email: "",
    password: "",
    valid: false,
    message: "",
    show: false,
  };
  //modal variables
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  const emailOnChange = (e) => {
    setState({ email: e.target.value });
  };
  const passwordOnChange = (e) => {
    setState({ password: e.target.value });
  };
  const Login = async () => {
    try {
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: ` {showspecificemployeelogin(email:"${state.email}"){email,password,datecreated}}`,
        }),
      });
      let payload = await response.json();
      if (state.email === payload.data.showspecificemployeelogin.email) {
        if (
          state.password !== payload.data.showspecificemployeelogin.password
        ) {
          setState({ valid: false });
          setState({ message: "Invalid login, check email or password!" });
        } else {
          setState({ valid: true });
          console.log("Logging in...");
          sessionStorage.setItem("token", state.email);
          getToken();
        }
      } else if (state.email !== payload.data.showspecificemployeelogin.email) {
        setState({ valid: false });
        setState({ message: "Invalid login, check email or password!" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const initialize = async () => {
    setState({ show: true });
  };
  const msgfromchild = async () => {
    setState({ show: false });
    props.dataFromChild(`Password Reset!`);
  };
  return (
    <MuiThemeProvider theme={theme}>
      <Card>
        <CardContent align="center">
          <Typography variant="h4" color="primary">
            Login
          </Typography>

          {!getToken() ? (
            <form
              style={{
                width: "85%",
                marginLeft: "10px",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: "400px",
              }}
              align="center"
            >
              <div>{state.valid ? "" : state.message}</div>
              <div>
                <TextField
                  fullWidth
                  label="Email"
                  variant="standard"
                  margin="dense"
                  type="email"
                  size="small"
                  required
                  onChange={emailOnChange}
                />

                <TextField
                  fullWidth
                  label="Password"
                  variant="standard"
                  margin="dense"
                  type="password"
                  size="small"
                  required
                  onChange={passwordOnChange}
                />
              </div>

              <div>
                <Button
                  onClick={Login}
                  style={{ marginTop: "20px" }}
                  variant="contained"
                  color="primary"
                  disabled={!state.email || !state.password}
                >
                  LOGIN
                </Button>
              </div>
              <div>
                <Button
                  onClick={initialize}
                  style={{ marginTop: "20px" }}
                  variant="outlined"
                  color="secondary"
                >
                  Forgot Password
                </Button>
              </div>
              <br />
              <ForgetPassword
                onClose={() => setState({ show: false })}
                show={state.show}
                refresh={msgfromchild}
              />
            </form>
          ) : (
            <Typography color="secondary">Logged in</Typography>
          )}
        </CardContent>
      </Card>
    </MuiThemeProvider>
  );
};
export default LoginPage;
