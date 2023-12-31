'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider } from '@mui/material/styles';

import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

import { validate } from 'email-validator';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Page() {

  /*
  This function does the actual work
  calling the fetch to get things from the database.
  */ 
  async function runDBCallAsync(url) {


    const res = await fetch(url);
    const data = await res.json();

 
    if(data.data== "valid"){
      console.log("login is valid!")

      
    } else {

      console.log("not valid  ")
    }
  }

  const validateForm = (event) => {
    
    let errorMessage = '';
    const data = new FormData(event.currentTarget);

    // get the email
    let email = data.get('email')
    // Validate the password
    let pass = data.get('pass')
    let secondpass = data.get('secondpass')

    if(pass.length ==0){
      errorMessage += ' No password added ';
      }

    if(secondpass.length == 0){
      errorMessage += '/ No password added ';
      }

    // pull in the validator
    var validator = require("email-validator");

    let emailCheck = validator.validate(email);

    // run the validator
    console.log("email status" + emailCheck);

    // if it is false, add to the error message.
    if(emailCheck == false)
    {
      errorMessage += '/ Incorrect email ';
    }
    
      return errorMessage;
    }

  /*

  When the button is clicked, this is the event that is fired.
  The first thing we need to do is prevent the default refresh of the page.
  */
	const handleSubmit = (event) => {
		
		console.log("handling submit");

    event.preventDefault();
  
    // call out custom validator
    let errorMessage = validateForm(event);

    // save the mesage
    setErrorHolder(errorMessage)

    // if we have an error
    if(errorMessage.length > 0)
    {
    
      setOpen(true);

    } 
      else 
    {
		const data = new FormData(event.currentTarget);


    let email = data.get('email')
		let pass = data.get('pass')
    let secondpass = data.get('secondpass')
		let address = data.get('address')
    let phone = data.get('phone')

    console.log("Sent email:" + email)
    console.log("Sent pass:" + pass)
    console.log("Sent secondpass:" + secondpass)
    console.log("Sent address:" + address)
    console.log("Sent phone:" + phone)


    runDBCallAsync(`api/register?email=${email}&pass=${pass}&secondpass=${secondpass}&address=${address}&phone=${phone}`)
    }
  }; // end handler




  
  const theme = createTheme({
    palette: {
     
      secondary: {
        main: green[500],
      },
    },
  });
  

 // first
 const [open, setOpen] = React.useState(false);
 const handleClickOpen = () => {
 setOpen(true);
 };

 const handleClose = () => {
 setOpen(false);
 };

 // second
 const [errorHolder, setErrorHolder] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
<React.Fragment>
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >

  <DialogTitle id="alert-dialog-title">
  {"Error"}
  </DialogTitle>

  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      {errorHolder}
    </DialogContentText>
  </DialogContent>
  
  <DialogActions>

    <Button onClick={handleClose} autoFocus>
      Close
    </Button>

  </DialogActions>
  </Dialog>

</React.Fragment>

    <Container component="main"  maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="pass"
            label="Pass"
            type="pass"
            id="pass"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="secondpass"
            label="Repeat Pass"
            type="secondpass"
            id="secondpass"
            autoComplete="current-secondpassword"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="address"
            label="Address"
            type="address"
            id="address"
            autoComplete="current-address"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="phone-number"
            label="Phone number"
            type="phone-number"
            id="phone-number"
            autoComplete="current-phone-number"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>




          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

    </Container>

    </ThemeProvider>

  );
}