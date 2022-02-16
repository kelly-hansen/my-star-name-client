import React from 'react'
import PropTypes from 'prop-types'

const SortArrow = ({ name, sortColumn, sortOrder }) => {
  return name !== sortColumn
    ? <span className='pointer pl-1 fad fa-sort' name={name}></span>
    : sortOrder === 'asc'
      ? <span className='pointer pl-1 fad fa-sort-up' name={name}></span>
      : <span className='pointer pl-1 fad fa-sort-down' name={name}></span>
}

SortArrow.propTypes = {
  name: PropTypes.string,
  sortColumn: PropTypes.string,
  sortOrder: PropTypes.string
}

export default SortArrow
