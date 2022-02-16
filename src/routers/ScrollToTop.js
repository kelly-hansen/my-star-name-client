import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return children
}

ScrollToTop.propTypes = {
  children: PropTypes.element
}

export default ScrollToTop
