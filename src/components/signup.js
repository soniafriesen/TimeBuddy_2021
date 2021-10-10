import React from "react";
import { TextField, Button, Typography } from '@material-ui/core'

export default function SignUp() {
    
        return (
            <form style={{width:'85%', marginLeft:'5%', alignItems:'center', justifyContent: "center"}} align="center">
                <Typography variant="h4"  style={{marginTop:'20px'}} color="primary">Create New User</Typography>
<div>
                <TextField fullWidth label="First Name" variant="standard" margin="dense" size="small" required />
  <TextField fullWidth label="Last Name" variant="standard"  margin="dense" size="small" required />
  <TextField fullWidth label="Email" variant="standard" type="email" margin="dense" size="small" required />
  <TextField fullWidth label="Password" variant="standard" type="password"  size="small" margin="dense" required />
  </div>

      <div>
  <Button style={{marginTop:'20px'}} type="submit" variant="contained" color="primary">
    Signup
  </Button>
</div>

            </form>
        );
    
}