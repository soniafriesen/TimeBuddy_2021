import React from "react";
import {TextField, Button, Typography, CardContent } from '@material-ui/core'

export default function ScheduleMeeting() {
    
        return (
            <CardContent>
                <Typography variant="h4"  style={{marginTop:'20px'}} color="primary">Schedule Meeting</Typography>

                <form style={{width:'85%', marginLeft:'5%', alignItems:'center', justifyContent: "center"}} align="center">
<div>


<Typography style={{marginTop:'10px'}}>Date
                <input style={{margin:'10px', width:'120px'}} fullWidth label="Date" variant="standard" type="date" margin="large" required />
                </Typography>
                <Typography style={{marginTop:'10px'}}>Time
  <input style={{margin:'10px', width:'120px'}} fullWidth label="Time" type="time" variant="standard"  margin="dense" size="large" required />
  </Typography>
  <TextField fullWidth label="Description" variant="standard" margin="dense" size="small" required />
  </div>

      <div>
  <Button style={{marginTop:'20px'}} type="submit" variant="contained" color="primary">
    SUBMIT
  </Button>
</div>

            </form>

            </CardContent>
        );
}