import {
  FETCH_PREFECTURE_NAMES_PROCESSING,
  PREFECTURE_TOGGLED
} from 'store/types'

/** 都道府県名取得を開始するアクションクリエーター */
export const fetchPrefectureNames = () => ({
  type: FETCH_PREFECTURE_NAMES_PROCESSING
})

/**
 * 都道府県を選択する用のアクションクリエーター
 * @param {object} event チェックボックスのクリックにより発生するイベント
 * @param {boolean} 人口データ取得の必要性
 */
export const togglePrefecture = (prefCode, shouldFetchPopulation) => ({
  type: PREFECTURE_TOGGLED,
  prefCode,
  shouldFetchPopulation
})
