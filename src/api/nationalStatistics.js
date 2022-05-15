const apiUrl = 'https://opendata.resas-portal.go.jp/'

/**
 * 地域経済分析システムAPIのラッパー
 * @param {string} path 具体的なAPIエンドポイント(GETリクエストを含む)
 * @return APIからのリスポンスのプロミス
 * @throws {Error}
 */
const fetchNationalStatistics = async path => {
  const fullUrl = apiUrl + path
  const response = await window.fetch(
    fullUrl,
    {
      headers: {
        'X-API-KEY': process.env.REACT_APP_RESAS_API_KEY
      }
    }
  )

  if (response.status !== 200) {
    throw new Error(`${fullUrl} から${response.status}のリスポンスが返されました。`)
  }

  const json = await response.json()
  if (!json.result) {
    throw new Error(`${fullUrl} からのリスポンスのbodyの形式が間違っています。`)
  }

  return json.result
}

/**
 * 都道府県名を地域経済分析システムAPIから取得する用のラッパー
 * @return 都道府県名と都道府県番号を含むプロミス
 * @throws {Error}
 */
const fetchPrefectureNames = () =>
  fetchNationalStatistics('api/v1/prefectures/')

/**
 * 都道府県の人口データを地域経済分析システムAPIから取得する用のラッパー
 * @param {string|number} prefCode 都道府県コード
 * @param {string} populationType 人口の種類(総人口:'total', 年少人口: 'youth', 生産年齢人
 * 口: 'productiveAge', 老年人口: 'elderly')
 * @param {*} lowerYearBoundary 年下方境界
 * @param {*} upperYearBoundary 年上方境界
 * @return 都道府県人口データ含むプロミス
 * @throws {Error}
 */
const fetchPrefecturePopulation = async (
  prefCode,
  populationType,
  lowerYearBoundary,
  upperYearBoundary
) => {
  const populationTypes = {
    total: 0,
    youth: 1,
    productiveAge: 2,
    elderly: 3
  }

  const response = await fetchNationalStatistics(
    `api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`
  )

  return response.data[populationTypes[populationType]].data.filter(
    ({ year }) => year >= lowerYearBoundary && year <= upperYearBoundary
  )
}

export default {
  fetchPrefectureNames,
  fetchPrefecturePopulation
}
