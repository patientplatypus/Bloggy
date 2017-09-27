import { combineReducers } from 'redux'
import counter from './counter'
import text from './text'
import backendhook from './backendhook'
import backendhookedit from './backendhookedit'
import login from './login'
import token from './token'
import email from './email'
import post from './post'
import retrieveuserposts from './retrieveuserposts'

const reducersCombined = combineReducers({
  counter,
  text,
  backendhook,
  login,
  email,
  post,
  backendhookedit,
  retrieveuserposts,
  token
})

export default reducersCombined
