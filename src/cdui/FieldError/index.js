import React from 'react'
import PropTypes from 'prop-types'

const FieldError = ({ error, touched }) => {
  return (
    <div>
      {error && touched
        ? <small className='error mt-1 text-danger'>{error}</small>
        : <small className='error mt-1 text-danger invisible'>something</small>
      }
    </div>
  )
}

FieldError.propTypes = {
  error: PropTypes.string,
  touched: PropTypes.bool
}

export default FieldError
