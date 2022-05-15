import React from 'react'
import { FormControlLabel, Checkbox } from '@material-ui/core'

/**
 * チェックボックスの一覧。
 * @param {object} フィルターで表示したいアイテムのデータ。nameとselectedというフィールド
 * が必須。nameはチェックオックス名、selectedは選択状況。
 * @param {() => object} クリックにより発動されるファンクション
 */
export const Filter = ({ items, onChange }) => (
  <div className='filter'>
    {
      Object.entries(items).map(
        ([id, { selected, name }]) => (
          <FormControlLabel
            className='filter-label'
            key={'filter-' + id}
            control={
              <Checkbox
                checked={selected}
                onChange={onChange}
                name={id}
                color='primary'
              />
            }
            label={name}
          />
        )
      )
    }
  </div>
)
