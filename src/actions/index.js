import {actionPromise, gql} from '../App';

const bd_Url = "http://185.233.118.209:5000/"




const actionLogin = (login, password) =>{
  const loginObj = {
    username:login,
    password:password
  }
  return ()=>actionPromise('login', gql(`${bd_Url}auth/login`,'POST',loginObj))
}

const actionRegister = (login, password, nick) =>{
  const loginObj = {
    username:login,
    password:password,
    nick:nick
  }
  return ()=>actionPromise('reg', gql(`${bd_Url}auth/registration`,'POST',loginObj))
}

const actionSurveys = ()=>{
  return ()=>actionPromise('surveys', gql(`${bd_Url}api/all_Surveys`,'GET'))
}



const actionSurvey = (_id)=>{
  return ()=>actionPromise('survey', gql(`${bd_Url}api/surveys/${_id}`,'GET'))
}


const actioCreate = (obj)=>{
  console.log(obj)
 return ()=>actionPromise('crate', gql(`${bd_Url}api/surveys`,'POST',obj))
}


const actionOneUser = (_id)=>{
  return ()=>actionPromise('user', gql(`${bd_Url}auth/users/${_id}`,'GET'))
}


const actionDelete = (_id)=>{
  const body = {
    _id:_id
  }
  return ()=>actionPromise('delete', gql(`${bd_Url}api/del_answers`,'DELETE',body))
}


const actionSend = (obj)=>{
  return ()=>actionPromise('send', gql(`${bd_Url}api/answers`,'POST',obj))
}

const actionGetAnswers = (id)=>{
  return ()=>actionPromise('all_answers', gql(`${bd_Url}api/all_Answers/${id}`,'GET'))
}

const actionGetMyAnswers = (id,username)=>{
  const body = {
    username
  }
  return ()=>actionPromise('my_answer', gql(`${bd_Url}api/my_Answer/${id}`,'POST',body))
}




export {
    actionSurveys,
    actionLogin,
    actionOneUser,
    actionSend, 
    actionSurvey, 
    actioCreate,
    actionRegister,
    actionDelete,
    actionGetAnswers,
    actionGetMyAnswers,
    bd_Url
  } 