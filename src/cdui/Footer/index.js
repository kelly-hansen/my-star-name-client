import React from 'react'
import PropTypes from 'prop-types'

const Footer = () => {
  return (
    <footer className='footer p-0'>
      <div className='row px-3 px-lg-5' style={{ backgroundColor: '#70635C' }}>
        <div className='col-12 col-sm-4 py-0 py-lg-3 pl-3'>
          <div className='pt-3 px-3 px-lg-5'>
            <p className='f-bold'>Contact</p>
            {/* <p className='mb-0'>Central Office</p>
            <p className='mb-0'>60 Executive Park South, NE</p>
            <p className='mb-3'>Atlanta, GA 30329</p> */}
            <div className='mb-2'>
              <div className='mb-1'><a style={{ wordBreak: 'break-word' }} href="mailto:rentalassistance@dca.ga.gov">rentalassistance@dca.ga.gov</a></div>
              <div className='mb-1'><a className='text-white' href='https://www.dca.ga.gov/' target='_blank' rel='noopener noreferrer'>DCA Website</a></div>
              <div className='mb-1'><a className='text-white' href='tel:+8338277368'>833-827-RENT</a></div>
              <div><a className='text-white' href='tel:+8338277368'>833-827-7368</a></div>
            </div>
          </div>
        </div>
        <div className='col-12 col-sm-4 py-0 py-lg-3'>
          <div className='pt-3 px-3 px-lg-5'>
            <p className='f-bold'>Find Us on Social Media</p>
            <a className='mr-2' style={{ fontSize: '25px' }} href='https://www.facebook.com/GeorgiaDCA/' target='_blank' rel='noopener noreferrer'><span className='fab fa-facebook mr-2' style={{ minWidth: '15px' }}/></a>
            <a className='mr-2' style={{ fontSize: '25px' }} href='https://www.instagram.com/ga_dca/' target='_blank' rel='noopener noreferrer'><span className='fab fa-instagram mr-2' style={{ minWidth: '15px' }}/></a>
            <a className='mr-2' style={{ fontSize: '25px' }} href='https://twitter.com/GA_DCA' target='_blank' rel='noopener noreferrer'><span className='fab fa-twitter mr-2' style={{ minWidth: '15px' }}/></a>
            <a className='mr-2' style={{ fontSize: '25px' }} href='https://www.linkedin.com/company/georgia-department-of-community-affairs/?trk=hp-feed-company-name' target='_blank' rel='noopener noreferrer'><span className='fab fa-linkedin mr-2' style={{ minWidth: '15px' }}/></a>
            <a style={{ fontSize: '25px' }} href='https://www.youtube.com/channel/UCQn_zKD8Fo0SvAsL6Oxqa6Q' target='_blank' rel='noopener noreferrer'><span className='fab fa-youtube mr-2' style={{ minWidth: '15px' }}/></a>
          </div>
        </div>
        <div className='col-12 col-sm-4 py-0 py-lg-3 pr-3'>
          <div className='pt-3 px-3 px-lg-5'>
            <p className='f-bold'>Privacy Policy</p>
            <p className='mb-0' style={{ fontSize: '1rem' }}>DCA strives to provide online resources in a safe, secure manner that respects your privacy when you visit our site.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
}

export default Footer
