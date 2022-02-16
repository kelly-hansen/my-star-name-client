import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const ResultSet = ({ setResultSet, defaultRows = 10, gap = [10, 25, 50], totalPages }) => {
  if (defaultRows && typeof defaultRows === 'string') {
    defaultRows = parseInt(defaultRows)
  }

  const [rows, setRows] = useState(defaultRows)

  const handleChange = (e) => {
    setRows(e.target.value)
  }

  useEffect(() => {
    setResultSet(rows)
  }, [rows])

  return (
    totalPages > 0 && <div className='form-row form-inline justify-content-md-end justify-content-center'>
      <div className='form-group mb-2 d-flex mr-2'>
        <label className='mr-2 my-auto'>Rows: </label>
        <select
          className='form-control'
          onChange={handleChange}
          value={rows}>
          {gap.map((val, i) => {
            return (
              <option key={i} value={val}>{val}</option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

ResultSet.propTypes = {
  setResultSet: PropTypes.func,
  defaultRows: PropTypes.number,
  gap: PropTypes.array,
  totalPages: PropTypes.number
}

export default ResultSet
