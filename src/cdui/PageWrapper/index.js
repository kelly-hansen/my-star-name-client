import React from 'react'
import PropTypes from 'prop-types'

const PageWrapper = ({ children }) => {
  return (
    <div className='row align-items-center justify-content-center'>
      <div className='col-12 col-lg-7 col-xl-6 col-xxl-5 pt-3 pt-lg-5 mb-5'>
        {children}
      </div>
    </div>

  )
}

PageWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ])
}

export default PageWrapper
