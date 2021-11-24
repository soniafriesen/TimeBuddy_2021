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
const UpdateVacationModal = (props) => {
  //employee fields, same as the db schema
  const initialState = {
    resArr: [],
    toid: null,
    empid: 0,
    startdate: "",
    enddate: "",
    description: "",
    requestdate: "",
    approved: "",
    edittoid: 0,
    show: props.show,
  };
  //modal variables
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  const toidOnChange = (e) => {
    setState({ edittoid: e.target.value });
  };
  const approveOnChange = (e) => {
    setState({ approved: e.target.value });
  };
  const findTimeOff = async () => {
    try {
      let timeoff = parseInt(state.edittoid);
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: ` {showspecifictimeoff(toid:${timeoff}){toid,empid,startdate,enddate,description,approved,requestdate}}`,
        }),
      });
      let payload = await response.json();
      setState({
        toid: payload.data.showspecifictimeoff.toid,
        empid: payload.data.showspecifictimeoff.empid,
        startdate: payload.data.showspecifictimeoff.startdate,
        enddate: payload.data.showspecifictimeoff.enddate,
        description: payload.data.showspecifictimeoff.description,
        requestdate: payload.data.showspecifictimeoff.requestdate,
        approved: payload.data.showspecifictimeoff.approved,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const approveTimeOff = async () => {
    try {
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: ` mutation{updateapproval(toid:${state.edittoid}){toid,empid,startdate,enddate,description,approved,requestdate}}`,
        }),
      });
      let payload = await response.json();
      console.log(payload);
      setState({
        toid: null,
        empid: 0,
        startdate: "",
        enddate: "",
        description: "",
        requestdate: "",
        approved: "",
        edittoid: null,
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
            Vacation Time
          </Typography>
          <Table aria-label="member table">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <TextField
                    id="find-field"
                    value={state.edittoid}
                    onChange={toidOnChange}
                    fullWidth
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <Button
                    onClick={findTimeOff}
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
                  Employee ID
                </TableCell>
                <TableCell component="th" scope="row">
                  Start Time
                </TableCell>
                <TableCell component="th" scope="row">
                  End Time
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
              <TableRow key="headers2">
                <TableCell component="th" scope="row">
                  <TextField id="empid-field" value={state.empid} fullWidth />
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    id="startdate-field"
                    value={state.startdate}
                    fullWidth
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    id="enddate-field"
                    value={state.enddate}
                    fullWidth
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    id="description-field"
                    value={state.description}
                    fullWidth
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    id="requestdate-field"
                    value={state.requestdate}
                    fullWidth
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    id="approval-field"
                    onChange={approveOnChange}
                    value={state.approved}
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
                    onClick={approveTimeOff}
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
export default UpdateVacationModal;
