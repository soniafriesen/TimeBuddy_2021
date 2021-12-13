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
const UpdateShiftModal = (props) => {
  //employee fields, same as the db schema
  const initialState = {
    resArr: [],
    shiftid: null,
    empid: null,
    date: "",
    starttime: "",
    endtime: "",
    editid: null,
    show: props.show,
  };
  //modal variables
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  const onShiftStartChange = (e) => {
    setState({ starttime: e.target.value });
  };

  const onShiftEndChange = (e) => {
    setState({ endtime: e.target.value });
  };
  const editOnchange = (e) => {
    setState({ editid: e.target.value });
  };
  const findShift = async () => {
    try {
      let shift = parseInt(state.editid);
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: `{getspecificshift(shiftid:${shift}){shiftid,empid,date,starttime,endtime}}`,
        }),
      });
      let payload = await response.json();
      setState({
        shiftid: payload.data.getspecificshift.shiftid,
        empid: payload.data.getspecificshift.empid,
        date: payload.data.getspecificshift.date,
        starttime: payload.data.getspecificshift.starttime,
        endtime: payload.data.getspecificshift.endtime,
      });
      console.log(payload.data.getspecificshift);
    } catch (error) {
      console.log(error);
    }
  };
  const updateShift = async () => {
    try {
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: `
                    mutation{updateshiftstarttime(shiftid:${state.editid},starttime:"${state.starttime}"){shiftid,empid,date,starttime,endtime}}
                  `,
        }),
      });
      response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: `
                    mutation{updateshiftendtime(shiftid:${state.editid},endtime:"${state.endtime}"){shiftid,empid,date,starttime,endtime}}
                  `,
        }),
      });

      let payload = await response.json();
      console.log(payload);
      setState({
        managerid: null,
        department: "",
        empid: 0,
        firstname: "",
        lastname: "",
        email: "",
        dob: "",
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
            Shift
          </Typography>
          <Table aria-label="member table">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <TextField
                    id="find-field"
                    value={state.editid}
                    onChange={editOnchange}
                    fullWidth
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <Button
                    onClick={findShift}
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
                  Date
                </TableCell>
                <TableCell component="th" scope="row">
                  Start Time
                </TableCell>
                <TableCell component="th" scope="row">
                  End Time
                </TableCell>
              </TableRow>
              <TableRow key="headers2">
                <TableCell>
                  <TextField
                    style={{ margin: "10px", width: "120px" }}
                    fullWidth
                    variant="standard"
                    margin="dense"
                    size="small"
                    disabled="true"
                    value={state.empid}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <input
                    style={{ margin: "10px", width: "120px" }}
                    fullWidth
                    label="Date"
                    variant="standard"
                    type="date"
                    margin="large"
                    value={state.date}
                    disabled="true"
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    id="start-time-field"
                    required
                    onChange={onShiftStartChange}
                    value={state.starttime}
                    fullWidth
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    id="end-time-field"
                    required
                    onChange={onShiftEndChange}
                    value={state.endtime}
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
                    onClick={updateShift}
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
export default UpdateShiftModal;
