import { useSelector } from 'react-redux';
import React from 'react';
import '../../App.scss';
import { history, actionAuthLogout, store} from '../../App.js';
import { connect } from 'react-redux';
import { actionOneUser } from '../../actions';
import { AppBar, Container, Toolbar, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    position: "absolute",
    right: "-10px",
  },
  Buttons: {
    position: "absolute",
  },
  title: {
    flexGrow: 1,
    cursor: "pointer"
  },
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    position: "absolute",
    right: 50,
    cursor: "pointer"

  },

}))



const Header = ({ data }) => {
  const logined = useSelector(state => state?.auth?.token);
  const id = useSelector(state => state.auth?.payload?.id)
  const role = useSelector(state => state.auth?.payload?.roles[0])

  useEffect(() => {
    id && data(id)
  },[id])


  const classes = useStyles()

  const onclickLogout = () => {
    store.dispatch(actionAuthLogout())
    history.push("/sign_in")
  }
  const onclickCreateAd = () => {
    history.push("/create")
  }

  const Buttons = () => {
    if (logined) {
      if(role==='ADMIN'){
        return (<>
          <Button color="secondary" className={classes.large} variant="contained" onClick={onclickLogout}>Logout</Button>
          <Button color="inherit" className={classes.Buttons} variant="outlined" onClick={onclickCreateAd}><AddCircleIcon/>Create</Button>
        </>)
      }else{
        return (
          <Button color="secondary" className={classes.large} variant="contained" onClick={onclickLogout}>Logout</Button>
          )
      }
    } else {
      return <>
        <Box mr={3}>
          <Button color="inherit" variant="outlined" onClick={() => history.push("/sign_in")}>Sign in</Button>
        </Box>
        <Button color="secondary" variant="contained" onClick={() => history.push("/sign_up")}>Sign Up</Button></>
    }
  }
  return (<>
    <AppBar position="fixed" >
      <Container fixed>
        <Toolbar>
          <Buttons />
        </Toolbar>
      </Container>
    </AppBar>
  </>
  )
}


const HeaderConnect = connect(state => ({
  myUser: state.promise?.user?.payload || []
}),
  { data: actionOneUser })(Header)

export default HeaderConnect