import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import {useState, useEffect} from "react";
import {useSelector} from "react-redux"
import {connect} from 'react-redux';
import { useParams } from 'react-router-dom';
import {actionSend,actionGetAnswers,actionSurvey} from '../../actions';
import CustomizedTables from '../table'
import {history} from '../../App.js';
import {AlertDialog} from '../alert'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import '../add/Add.scss';


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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title:{
    alignSelf: 'center',
    marginBottom: '50px'
  },
  Buttons:{
    marginTop: '70px',
    marginLeft: '50px'
  }
}));


  
function Answer({actionSurvey,actionSend,actionGetAnswers, survey,answers}) {
  const classes = useStyles()
  const { _id } = useParams()
  const username = useSelector(state => state.promise?.user?.payload?.username)
  const role = useSelector(state => state.auth?.payload?.roles[0])
  const [answer, setAnswer] = useState({ answer1:'', answer2:'',answer3:'',});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    actionGetAnswers(_id)
    actionSurvey(_id)
  }, [])

  const onclickSend = async()=>{
      await actionSend({...answer, idQuestion:_id, owner:username})
      setOpen(true)
  }

  const onclickBack = ()=>{
    history.push("/home")
  }

  return (<>
  <Button color="inherit" className={classes.Buttons} onClick={onclickBack} variant="outlined" ><ArrowBackIcon/>Back</Button>
    {role==='USER'&&<main className="mainAdd">
              <div className="textBox">
                  <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                    {survey.title ? survey.title : ""}
                  </Typography>
                  <Typography gutterBottom  component="h5">
                    {survey.question1 ? survey.question1 : ""}
                  </Typography>
                  <TextField
                  value={answer.answer1}
                  onChange={(e) => setAnswer({...answer, answer1: e.target.value})} 
                    className={classes.input} 
                    required id="standard-required" 
                    label="Answer 1"
                    multiline
                    variant="outlined"  
                    />
                    <Typography gutterBottom  component="h5">
                      {survey.question2 ? survey.question2 : ""}
                    </Typography>
                    <TextField
                  value={answer.answer2}
                  onChange={(e) => setAnswer({...answer, answer2: e.target.value})} 
                    className={classes.input} 
                    required id="standard-required" 
                    label="Answer 2"  
                    multiline
                    variant="outlined"
                    />
                    <Typography gutterBottom  component="h5">
                      {survey.question3 ? survey.question3 : ""}
                    </Typography>
                    <TextField
                  value={answer.answer3}
                  onChange={(e) => setAnswer({...answer, answer3: e.target.value})} 
                    className={classes.input} 
                    required id="standard-required" 
                    label="Answer 3"
                    multiline
                    variant="outlined"  
                    />
                  <Button
                  onClick={onclickSend}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  >
                  Answer 
                  </Button>
              </div>
              <AlertDialog open={open} setOpen={setOpen}/>
    </main>}
    {role==='ADMIN'&&<CustomizedTables rows={answers} questions={survey}/>}</>
  );
}

const AnswerUser = connect(state => ({
  survey: state.promise?.survey?.payload || [],
  answers: state.promise?.all_answers?.payload || []}),
  {actionSurvey: actionSurvey,
    actionSend:actionSend,
    actionGetAnswers:actionGetAnswers} )(Answer)


export default AnswerUser