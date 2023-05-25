import { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import '../../App.scss';
import './goods.scss';
import CardActionArea from '@material-ui/core/CardActionArea';
import DeleteIcon from '@material-ui/icons/Delete';
import { history } from '../../App.js';
import {connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { actionSurveys,actionGetMyAnswers,actionDelete} from '../../actions';
import {AlertError} from '../alert'

const useStylesImg = makeStyles({
  root: {
    margin: '14px'
  },
  media: {
    height: 280,
  },
  mediaButton: {
    justifyContent: 'center'
  },
  time: {
    margin: "5px",
    float: "right"
  },
  card: {
    textAlign: "center"
  }
})

const SurveyCard = ({ survey, actionGetMyAnswers,actionDelete,setAlert,setDel, del }) => {
  const username = useSelector(state => state.promise?.user?.payload?.username)
  const role = useSelector(state => state.auth?.payload?.roles[0])


  const onClickSurvey = async() => {
    if(role==='USER'){
      let answers = await actionGetMyAnswers(survey._id,username)
      answers[0]? setAlert(true) :history.push("/survey/" + survey._id)
    }else{
      history.push("/survey/" + survey._id)
    }
  }

  const onClickDel = async() => {
    await actionDelete(survey._id)
    setDel(!del)
  }

  return (<>
    <div className="product-wrapper">
      <Card className={useStylesImg().root}>
        <CardActionArea className={useStylesImg().card}>
          <CardContent onClick={onClickSurvey}>
            <Typography gutterBottom variant="h5" component="h2">
              {survey.title ? survey.title : ""}
            </Typography>
            <Typography gutterBottom  component="h5">
              {survey.question1 ? survey.question1 : ""}
            </Typography>
            <Typography gutterBottom  component="h5">
              {survey.question2 ? survey.question2 : ""}
            </Typography>
            <Typography gutterBottom  component="h5">
              {survey.question3 ? survey.question3 : ""}
            </Typography>
          </CardContent>
        </CardActionArea>
        {role==='ADMIN'&&<Button
              onClick={onClickDel}
              type="submit"
              variant="contained"
              fullWidth
              color="secondary">
              Delete 
              <DeleteIcon/>
            </Button>}
      </Card>
    </div>
    </>
  )
}



const Cards = ({status, surveys,actionSurveys,actionGetMyAnswers,actionDelete }) => {
  const [surveyArr, setSurveyArr] = useState([]);
  const [alert, setAlert] = useState(false);
  const [del, setDel] = useState(false);

  useEffect(() => {
    actionSurveys()
  }, [del])
 
  
  useEffect(() => {
    setSurveyArr(surveys)
  }, [surveys])


  if (status === 'PENDING') {
    return (
      <img className='preloader' src='https://i.pinimg.com/originals/c8/a1/76/c8a1765ffc8243f3a7b176c0ca84c3c1.gif' />
    )
  }
  return (<>
    <main className="mainGoodsList">
      <div className='cards'>
        {surveyArr.map(el => <SurveyCard key={el._id} setAlert={setAlert} survey={el} actionGetMyAnswers={actionGetMyAnswers} actionDelete={actionDelete} setDel={setDel} del={del} />)}
      </div>
    </main>
    {alert&&<AlertError setAlert={setAlert}/>}</>)
}


const MainList = connect(state => ({
  status: state.promise?.surveys?.status || [],
  surveys: state.promise?.surveys?.payload || []
}),
  {
    actionSurveys: actionSurveys,
    actionGetMyAnswers:actionGetMyAnswers,
    actionDelete:actionDelete
  })(Cards)

export default MainList
