import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import links from './modules/links'

export default combineReducers({
  form: formReducer,
  links
})