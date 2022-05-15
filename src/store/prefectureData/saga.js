import { put, takeEvery } from 'redux-saga/effects'
import api from 'api'
import {
  FETCH_PREFECTURE_NAMES_PROCESSING,
  FETCH_PREFECTURE_NAMES_SUCCESS,
  FETCH_PREFECTURE_NAMES_FAILED,
  PREFECTURE_TOGGLED,
  FETCH_PREFECTURE_POPULATION_PROCESSING,
  FETCH_PREFECTURE_POPULATION_SUCCESS,
  FETCH_PREFECTURE_POPULATION_FAILED
} from 'store/types'

function * fetchPrefectureNames () {
  try {
    const prefectureNames = yield api.nationalStatistics.fetchPrefectureNames()
    yield put({ type: FETCH_PREFECTURE_NAMES_SUCCESS, prefectureNames })
  } catch (e) {
    yield put({
      type: FETCH_PREFECTURE_NAMES_FAILED,
      error: 'データ取得に問題がありました。しばらくしてからもう一度お試しください。'
    })
    console.error(e)
  }
}

function * fetchPrefecturePopulation ({ prefCode, shouldFetchPopulation }) {
  try {
    if (!shouldFetchPopulation) return
    yield put({ type: FETCH_PREFECTURE_POPULATION_PROCESSING })
    const populationData = yield api.nationalStatistics
      .fetchPrefecturePopulation(prefCode, 'total', 1970, 2020)
    yield put({
      type: FETCH_PREFECTURE_POPULATION_SUCCESS,
      prefCode,
      populationData
    })
  } catch (e) {
    // チェックボックスのマークを外す。
    yield put({
      type: PREFECTURE_TOGGLED,
      prefCode,
      shouldFetchPopulation: false
    })
    yield put({
      type: FETCH_PREFECTURE_POPULATION_FAILED,
      error: 'データ取得に問題がありました。しばらくしてからもう一度お試しください。'
    })
    console.error(e)
  }
}

export default function * prefectureDataWatcher () {
  yield takeEvery(FETCH_PREFECTURE_NAMES_PROCESSING, fetchPrefectureNames)
  yield takeEvery(PREFECTURE_TOGGLED, fetchPrefecturePopulation)
}
