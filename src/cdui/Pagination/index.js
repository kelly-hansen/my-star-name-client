import React from 'react'
import PropTypes from 'prop-types'

const Pagination = ({ paginationButtons, prevDisabled, nextDisabled, pageNumber, setPageNumber, totalPages, onButtonClick = () => {} }) => {
  return (
    totalPages > 0 && <ul className='pagination d-flex justify-content-md-start justify-content-center mb-0'>
      <li
        className='page-item'
        onClick={() => {
          !prevDisabled && setPageNumber(1)
          onButtonClick()
        }}>
        <a className='page-link' aria-label='First' title='First' disabled={prevDisabled}>
          <span className='fas fa-angle-double-left'></span>
          <span className='sr-only'>First</span>
        </a>
      </li>

      <li
        className='page-item'
        onClick={() => {
          !prevDisabled && setPageNumber(pageNumber - 1)
          onButtonClick()
        }}>
        <a className='page-link' aria-label='Previous' title='Previous' disabled={prevDisabled}>
          <span className='fas fa-angle-left'></span>
          <span className='sr-only'>Previous</span>
        </a>
      </li>

      {paginationButtons.map((page, i) => {
        return (
          <li key={i} className={pageNumber === page ? 'page-item active' : 'page-item'}>
            <span
              className='page-link pointer'
              title={page}
              onClick={() => {
                setPageNumber(page)
                onButtonClick()
              }}>{page}</span>
          </li>
        )
      })}

      <li
        className='page-item'
        onClick={() => {
          !nextDisabled && setPageNumber(pageNumber + 1)
          onButtonClick()
        }}>
        <a className='page-link' aria-label='Next' title='Next' disabled={nextDisabled}>
          <span className='fas fa-angle-right'></span>
          <span className='sr-only'>Next</span>
        </a>
      </li>

      <li
        className='page-item'
        onClick={() => {
          !nextDisabled && setPageNumber(totalPages)
          onButtonClick()
        }}>
        <a className='page-link' aria-label='Last' title='Last' disabled={nextDisabled}>
          <span className='fas fa-angle-double-right'></span>
          <span className='sr-only'>Last</span>
        </a>
      </li>
    </ul>
  )
}

Pagination.propTypes = {
  prevDisabled: PropTypes.bool,
  nextDisabled: PropTypes.bool,
  setPageNumber: PropTypes.func,
  onButtonClick: PropTypes.func,
  pageNumber: PropTypes.number,
  totalPages: PropTypes.number,
  paginationButtons: PropTypes.array
}

export default Pagination
