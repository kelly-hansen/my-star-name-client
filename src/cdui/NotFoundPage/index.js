import React from 'react'
import PropTypes from 'prop-types'

export const NotFoundPage = ({ onClick }) => {
  return (
    <div className='content-wrapper d-flex align-items-center'>
      <div className='row w-100'>
        <div className='col-lg-8 mx-auto'>
          <div className='row'>
            <div className='col-12 bg-white p-3'>
              <div className='p-5 text-center'>
                <h1 className='display-2 mb-3'>404</h1>

                <p className='mb-3'>Sorry! The page you’re looking for was not found.</p>

                <div>
                  <button className='btn btn-link' onClick={onClick}>Take Me Back</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

NotFoundPage.propTypes = {
  onClick: PropTypes.func
}

export default NotFoundPage
