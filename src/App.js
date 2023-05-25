import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {Router, Route} from 'react-router-dom';
import React from 'react';
import './App.scss';
import SignIn from './components/signIn';
import SignUp from './components/signup';
import CreateAdConnect from './components/add';
import AnswerUser from './components/good';
import MainList from './components/goods'
import HeaderConnect from './components/header'
const history = require("history").createBrowserHistory()

async function gql(url, method="GET" ,obj) {
  let settings = {
      method: method,
      headers:checkToken(),
      body: JSON.stringify(obj)
  }
      const res = await fetch(url, settings)
      const res2 = await res.json()
      return res2
}

const checkToken = () => {
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
  if(localStorage.getItem('authToken')) {
    return {
      ...headers,
      "Authorization": `Bearer ${localStorage.getItem('authToken')}`
    }
  } else {
    return headers;
  }
}



const actionPromise = (namePromise,promise) =>{
  async function promiseStatus(dispatch) {
      dispatch(actionPending(namePromise))
      try{
          const payload = await promise 
          dispatch(actionFulfilled(namePromise,payload)) 
          return payload 
      }
      catch (error){
        dispatch(actionRejected(namePromise,error))
      }
  }
  return promiseStatus(store.dispatch)
}

const actionPending   = (namePromise)      => ({type: 'PROMISE', status: 'PENDING',namePromise})
const actionFulfilled = (namePromise,payload) => ({type: 'PROMISE', status: 'FULFILLED',namePromise, payload})
const actionRejected  = (namePromise,error)  => ({type: 'PROMISE', status: 'REJECTED', namePromise, error})

function promiseReducer(state={}, {type, status, payload, error,namePromise}){
  if (type === 'PROMISE'){
      return {
      ...state,
        [namePromise] : {status, payload, error}
      }
    }
    return state
}



const store = createStore(combineReducers({auth: authReducer, promise:localStoredReducer(promiseReducer, 'promise')}), applyMiddleware(thunk))
store.subscribe(() => console.log(store.getState()))


function jwtDecode(token){
	try {
		return JSON.parse(atob(token.split('.')[1]))
	}
	catch(e){
	}
}

function localStoredReducer(reducer, localStorageKey){
	function wrapper(state, action){
		if (state === undefined){
			try {
				return JSON.parse(localStorage[localStorageKey]) 
			}
			catch(e){ } 
		}
		const newState = reducer(state, action)
		localStorage.setItem(localStorageKey, JSON.stringify(newState)) 
		return newState
	}
	return wrapper
}


function authReducer(state={}, {type, token}){
	if (type === 'AUTH_LOGIN'){ 
		const payload = jwtDecode(token)
		try{
            if (payload){
                return {
                    token,
                    payload
                }
		    }
        }
        catch (e) {}
	}
	if (type === 'AUTH_LOGOUT'){ 
		return {}
	}
	return state
}

const actionAuthLogout = () =>
	() => {
		store.dispatch({type: 'AUTH_LOGOUT'});
		localStorage.removeItem('authToken');
    localStorage.clear()
	}

const actionAuthLogin = (token) =>
	() => {
		const oldState = store.getState()
		store.dispatch({type: 'AUTH_LOGIN', token})
		const newState = store.getState()
		if (oldState !== newState)
			localStorage.setItem('authToken', token)
	}



store.dispatch(actionAuthLogin(localStorage.authToken))
!store.getState().auth.token&&history.push("/sign_in")



function App() {
  return (
  <Router history = {history}>
    <Provider store={store}>
      <HeaderConnect/>
      <Route path="/sign_in" component={SignIn} exact/>
      <Route path="/sign_up" component={SignUp} exact/>
      <Route path="/create" component={CreateAdConnect} exact/>
      <Route path="/home" component={MainList} exact/>
      <Route path="/survey/:_id" component={AnswerUser} exact/>
    </Provider>
  </Router>
  );
}

export {
    store, 
    actionAuthLogout, 
    actionAuthLogin,
    history,
    actionPromise,
    gql
  } 

export default App;