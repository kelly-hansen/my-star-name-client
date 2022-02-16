import React, { Fragment, useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { history } from '../routers/AppRouter'
import { useLocation } from 'react-router-dom'

const NavBar = () => {
  const dropdownMobile = useRef()
  const [activeDropdown, setActiveDropdown] = useState(false)

  const location = useLocation()
  const { pathname } = location

  const handleDocumentClick = (e) => {
    if (dropdownMobile.current && dropdownMobile.current.contains(e.target)) return
    setActiveDropdown(false)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick)
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
    }
  }, [])

  return (
    <Fragment>
      <nav className='navbar col-12 p-0 fixed-top d-flex flex-row'>
        <div className='navbar-menu-wrapper d-flex align-items-center justify-content-between'>
          <div className='ml-3 pointer' onClick={() => history.push('/')}>
            <div className='mb-0 navbar-title font-weight-bold'>
              <span className='fas fa-star pr-2'></span>
              My Star Name
            </div>
          </div>
          <ul className='navbar-nav'>
            {/* Generate My Name */}
            <li className={`nav-item px-0 px-lg-3 d-none d-lg-flex justify-content-center ${pathname === '/faq' ? 'bg-light' : ''}`} >
              <div className='nav-link pointer d-flex align-items-center justify-content-center' onClick={() => { history.push('/generate-name') }}>
                <div>Generate My Name</div>
              </div>
            </li>

            {/* Table */}
            <li className={`nav-item px-0 px-lg-3 d-none d-lg-flex justify-content-center ${pathname === '/required-documents' ? 'bg-light' : ''}`}>
              <div className='nav-link pointer d-flex align-items-center justify-content-center' onClick={() => { history.push('/table') }}>
                <div>Table</div>
              </div>
            </li>

            {/* TABLET/MOBILE */}
            <li className={`nav-item dropdown ${activeDropdown ? 'show selected' : ''} d-flex d-lg-none justify-content-center align-items-center`} ref={dropdownMobile}>
              <div className='nav-link mobile-menu pointer' onClick={() => setActiveDropdown(true)}>
                <span className='nav-icon fas fa-bars' />
              </div>

              <div className={`navbar-dropdown dropdown-menu shadow fh-regular pointer ${activeDropdown ? 'show' : ''}`}>

                <div className='dropdown-item' onClick={() => { setActiveDropdown(false); history.push('/generate-name') }}>
                  <div className='body px-3'><span>Generate My Name</span></div>
                </div>

                <div className='dropdown-divider'></div>

                <div className='dropdown-item' onClick={() => { setActiveDropdown(false); history.push('/table') }}>
                  <div className='body px-3'><span>Table</span></div>
                </div>

              </div>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  )
}

NavBar.propTypes = {

}

export default NavBar
