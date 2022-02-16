import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const ScrollToTopButton = (props) => {
  const [distanceFromTop, setDistanceFromTop] = useState(window.innerHeight - 55)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    window.addEventListener('resize', calculatePosition)
    window.addEventListener('scroll', calculatePosition)
    return () => {
      window.removeEventListener('resize', calculatePosition)
      window.removeEventListener('scroll', calculatePosition)
    }
  }, [])

  const calculatePosition = () => {
    const heightOfFooter = document.querySelector('.footer').offsetHeight
    const stoppingPoint = document.documentElement.scrollHeight - heightOfFooter // where button hits footer
    const userScrolledTo = window.pageYOffset + window.innerHeight // where user has currently scrolled to on the document

    window.scrollY > 1024 // only show button when user has scrolled over 1024px down
      ? setIsVisible(true)
      : setIsVisible(false)

    userScrolledTo > stoppingPoint // adjust button placement when it hits footer
      ? setDistanceFromTop(window.innerHeight - 80 - heightOfFooter)
      : setDistanceFromTop(window.innerHeight - 55)
  }

  return (
    <button className={`btn-scroll-to-top ${isVisible ? 'show' : ''}`} style={{ top: distanceFromTop }} onClick={() => { props.handleClick() }}>
      <span className='fas fa-chevron-up text-white' />
    </button>
  )
}

ScrollToTopButton.propTypes = {
  handleClick: PropTypes.func
}

export default ScrollToTopButton
