import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const AppWrapper = ({ children }) => {
  return (
    <div className={`app-wrapper`}>
      {children}
    </div>
  )
}

AppWrapper.propTypes = {
  contentContainer: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
  icon: PropTypes.element,
  size: PropTypes.string,
  title: PropTypes.string
}

export default AppWrapper
