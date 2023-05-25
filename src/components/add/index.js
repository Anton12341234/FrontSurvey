import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import './Add.scss';
import {useState} from "react";
import {history} from '../../App.js';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {connect} from 'react-redux';
import {actioCreate} from '../../actions';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';



const useStyles = makeStyles((theme) => ({
  root: {
    height: '50vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input:{
    marginBottom: '3%'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  Buttons:{
    marginTop: '70px',
    marginLeft: '50px'
  }
}));


  
function CreateAd({action}) {
  const classes = useStyles()
  const [createAd, setCreateAd] = useState({ title:'', question1:'', question2:'',question3:'',});


  const onclickCreate = async()=>{
    await action(createAd)
    history.push("/home")
  }

  const onclickBack = ()=>{
    history.push("/home")
  }


  return (<>
  <Button color="inherit" className={classes.Buttons} onClick={onclickBack} variant="outlined" ><ArrowBackIcon/>Back</Button>
    <main className="mainAdd">
              <div className="textBox">
                  <TextField
                  value={createAd.title}
                  onChange={(e) => setCreateAd({...createAd, title: e.target.value})} 
                    className={classes.input} 
                    required id="standard-required" 
                    label="Title"  
                    />
                  <TextField
                  value={createAd.question1}
                  onChange={(e) => setCreateAd({...createAd, question1: e.target.value})} 
                    className={classes.input} 
                    required id="standard-required" 
                    label="Question 1"  
                    />
                    <TextField
                  value={createAd.question2}
                  onChange={(e) => setCreateAd({...createAd, question2: e.target.value})} 
                    className={classes.input} 
                    required id="standard-required" 
                    label="Question 2"  
                    />
                    <TextField
                  value={createAd.question3}
                  onChange={(e) => setCreateAd({...createAd, question3: e.target.value})} 
                    className={classes.input} 
                    required id="standard-required" 
                    label="Question 3"  
                    />
                  <Button
                  onClick={onclickCreate}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  startIcon={<AddCircleIcon/>}
                  >
                  create ad
                  </Button>
              </div>
    </main></>
  );
}

const CreateAdConnect = connect(state => ({}),
  {action: actioCreate} )(CreateAd)


export default CreateAdConnect