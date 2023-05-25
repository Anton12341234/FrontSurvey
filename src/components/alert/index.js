import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {history} from '../../App.js';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function AlertError({setAlert}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert onClose={() => setAlert(false)} variant="filled" severity="error">You have already completed this survey!</Alert>
    </div>
  );
}



function AlertDialog({open, setOpen}) {

  const handleClose = () => {
    setOpen(false);
    history.push("/home")
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          your answers have been sent successfully
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export {AlertError, AlertDialog} 