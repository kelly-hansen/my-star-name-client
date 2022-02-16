import React from 'react'
import PropTypes from 'prop-types'

const TableSearch = ({ search, setSearchTerm }) => {
  return (
    <div className='col form-group mb-0'>
      <input className='form-control mb-0' placeholder='Search...' value={search} onChange={setSearchTerm} />
    </div>
  )
}

TableSearch.propTypes = {
  search: PropTypes.string,
  setSearchTerm: PropTypes.func
}

export default TableSearch
