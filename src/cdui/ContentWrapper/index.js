import React from 'react'
import PropTypes from 'prop-types'

const ContentWrapper = ({ children, header, headerDesc = null, description, className = '' }) => {
  return (
    <div className={`px-5 px-lg-0 pt-3 ${className}`}>
      <div className='mb-4'>
        {headerDesc}
        {header && <h3>{header}</h3>}
        {description && <div>{description}</div>}
      </div>
      <div className='col-12 pb-2 px-0'>
        {children}
      </div>
    </div>

  )
}

ContentWrapper.propTypes = {
  header: PropTypes.string,
  className: PropTypes.string,
  headerDesc: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string
  ]),
  description: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ])
}

export default ContentWrapper
