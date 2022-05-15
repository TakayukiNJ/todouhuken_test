import {
  FETCH_PREFECTURE_NAMES_PROCESSING,
  FETCH_PREFECTURE_NAMES_SUCCESS,
  FETCH_PREFECTURE_NAMES_FAILED,
  PREFECTURE_TOGGLED,
  FETCH_PREFECTURE_POPULATION_PROCESSING,
  FETCH_PREFECTURE_POPULATION_SUCCESS,
  FETCH_PREFECTURE_POPULATION_FAILED
} from 'store/types'

const INITIAL_STATE = {
  prefectures: {},
  prefectureNameError: '',
  prefecturePopulationError: '',
  prefectureNamesLoading: true,
  prefecturePopulationLoading: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PREFECTURE_NAMES_PROCESSING:
      return { ...state, prefectureNameError: '', prefectureNamesLoading: true }

    case FETCH_PREFECTURE_NAMES_SUCCESS: {
      const prefectureState = action.prefectureNames.reduce((
        prefectureState, { prefName, prefCode }
      ) => {
        prefectureState[prefCode] = {
          name: prefName,
          selected: false
        }
        return prefectureState
      }, {})

      return {
        ...state,
        prefectures: prefectureState,
        prefectureNameError: '',
        prefectureNamesLoading: false
      }
    }

    case FETCH_PREFECTURE_NAMES_FAILED: return {
      ...state,
      prefectureNameError: action.error,
      prefectureNamesLoading: false
    }

    case PREFECTURE_TOGGLED: {
      const prefectures = { ...state.prefectures }
      prefectures[action.prefCode].selected =
        !prefectures[action.prefCode].selected

      return { ...state, prefectures }
    }

    case FETCH_PREFECTURE_POPULATION_PROCESSING:
      return { ...state, prefecturePopulationLoading: true }

    case FETCH_PREFECTURE_POPULATION_SUCCESS: {
      const prefectures = { ...state.prefectures }
      prefectures[action.prefCode].populationData = action.populationData

      return {
        ...state,
        prefectures,
        prefecturePopulationError: '',
        prefecturePopulationLoading: false
      }
    }

    case FETCH_PREFECTURE_POPULATION_FAILED: return {
      ...state,
      prefecturePopulationError: action.error,
      prefecturePopulationLoading: false
    }

    default:
      return state
  }
}
