import { combineReducers } from 'redux'
import adminReducer from './adminreducer'

export default combineReducers({
  admin: adminReducer
})
