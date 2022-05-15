import { call, all } from 'redux-saga/effects'
import prefectureDataWatcher from './prefectureData/saga'

export default function * rootSaga () {
  yield all([prefectureDataWatcher].map(watcher => call(watcher)))
}
