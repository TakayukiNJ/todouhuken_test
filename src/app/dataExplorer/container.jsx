import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  fetchPrefectureNames,
  togglePrefecture
} from 'store/prefectureData/actions'
import './style.css'
import { Paper, CircularProgress } from '@material-ui/core'
import { Filter } from './filter/view'
import { Chart } from './chart/view'

/**
 * Recharts用に都道府県データの形を変更する。
 * @param {object} prefectures 都道府県に関するデータ
 * @returns {object[]} Rechartsに使える形式の都道府県データ
 */
const formatChartData = prefectures => {
  // 一時的に年ごとにオブジェクトで保管する ({ 1970: { 大阪: '123', 東京: '321' } })
  const intermediaryObject = Object.values(prefectures)
    .filter(({ populationData }) => populationData)
    .reduce((chartData, { name, populationData }) => {
      populationData.forEach(({ value, year }) => {
        chartData[year] = { ...chartData[year], [name]: value }
      })
      return chartData
    }, {})

  return Object.entries(intermediaryObject)
    .map(([year, values]) => {
      values.name = year
      return values
    })
}

const DataExplorerWrapper = ({ children }) => (
  <Paper className='data-explorer'>
    <h3>都道府県</h3>
    <div className='data-explorer-contents'>
      {children}
    </div>
  </Paper>
)

/**
 * 都道府県のデータを調べる為のコンポーネント。
 * @param {object} props
 * @param {object} props.prefectures 都道府県に関するデータ
 * @param {boolean} props.prefectureNamesLoading 都道府県名のロード状態
 * @param {boolean} props.prefecturePopulationLoading 都道府県人口ロード状態
 * @param {string} props.prefectureNameError 都道府県名取得に発生したエラーメッセージ
 * @param {string} props.prefecturePopulationError 都道府県人口取得に発生したエラーメ
 * ッセージ
 * @param {() => object} props.fetchPrefectureNames 都道府県名取得を開始するアクショ
 * ンクリエーター
 * @param {(event: object) => object} props.togglePrefecture 都道府県を選択する用の
 * アクションクリエーター
 */
const DataExplorerContainer = ({
  prefectures,
  prefectureNamesLoading,
  prefecturePopulationLoading,
  prefectureNameError,
  prefecturePopulationError,
  fetchPrefectureNames,
  togglePrefecture
}) => {
  useEffect(() => {
    fetchPrefectureNames()
  }, [fetchPrefectureNames])

  if (prefectureNameError) {
    return <DataExplorerWrapper>{prefectureNameError}</DataExplorerWrapper>
  }
  if (prefectureNamesLoading) {
    return <DataExplorerWrapper><CircularProgress /></DataExplorerWrapper>
  }

  return (
    <DataExplorerWrapper>
      <Filter
        items={prefectures}
        onChange={(event) => {
          const prefCode = event.target.name
          togglePrefecture(prefCode, !prefectures[prefCode].populationData)
        }}
      />
      <Chart
        chartData={formatChartData(prefectures)}
        legendNames={
          Object.values(prefectures)
            .filter(({ selected }) => selected)
            .map(({ name }) => name)
        }
        processing={prefecturePopulationLoading}
        messageOnEmpty='都道府県を選択してください。'
        error={prefecturePopulationError}
      />
    </DataExplorerWrapper>
  )
}

const mapStateToProps = ({ prefectureData }) => prefectureData
const mapDispatchToProps = { fetchPrefectureNames, togglePrefecture }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataExplorerContainer)
