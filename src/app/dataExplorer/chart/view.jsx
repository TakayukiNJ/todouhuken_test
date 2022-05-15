import React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line
} from 'recharts'
import { CircularProgress } from '@material-ui/core'

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

/**
 * チャートを表示するコンポーネント
 * @param {object} props
 * @param {object[]} props.chartData チャートのデータ 例：[{name: 'a', value: 12}]
 * @param {string[]} props.legendNames チャートの凡例名
 * @param {boolean} props.processing チャートデータのロード状態
 * @param {string} props.messageOnEmpty 表示するデータがない時のメッセージ
 * @param {string} props.error データの取得に失敗した時のメッセージ
 */
export const Chart = ({
  chartData,
  legendNames,
  processing,
  messageOnEmpty,
  error
}) => {
  if (error) return <div className='chart'>{error}</div>
  if (processing) return <div className='chart'><CircularProgress /></div>
  if (!legendNames.length) return <div className='chart'>{messageOnEmpty}</div>
  return (
    <div className='chart'>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis tickFormatter={tick => tick.toLocaleString()} />
          <Tooltip formatter={value => value.toLocaleString()} />
          <Legend align='right' verticalAlign='top' layout='vertical' />
          {
            legendNames.map((name, index) => (
              <Line
                dataKey={name}
                key={`datakey-${name}`}
                stroke={colors[index % colors.length]}
              />
            ))
          }
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
