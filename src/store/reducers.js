import { combineReducers } from 'redux'
import prefectureDataReducer from './prefectureData/reducer'

export default combineReducers({
  prefectureData: prefectureDataReducer
})
