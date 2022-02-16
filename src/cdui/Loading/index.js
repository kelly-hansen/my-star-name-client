import React from 'react'
import PropTypes from 'prop-types'

const Loading = (props) => {
  const spinner = <svg className="lds-spinner" width="160px" height="160px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <g transform="rotate(0 50 50)"><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#c2c2c2"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.1s" begin="-1.0083333333333335s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(30 50 50)"><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#c2c2c2"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(60 50 50)"><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#c2c2c2"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.1s" begin="-0.8250000000000001s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(90 50 50)">  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#c2c2c2"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.1s" begin="-0.7333333333333334s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(120 50 50)"><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#c2c2c2"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.1s" begin="-0.6416666666666667s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(150 50 50)">  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#c2c2c2"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.1s" begin="-0.55s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(180 50 50)"><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#c2c2c2"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.1s" begin="-0.4583333333333333s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(210 50 50)">  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#c2c2c2"> <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.1s" begin="-0.3666666666666667s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(240 50 50)"><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#c2c2c2"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.1s" begin="-0.275s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(270 50 50)"><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#c2c2c2"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.1s" begin="-0.18333333333333335s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(300 50 50)"><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#c2c2c2"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.1s" begin="-0.09166666666666667s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(330 50 50)">  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#c2c2c2"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.1s" begin="0s" repeatCount="indefinite"></animate></rect></g>
  </svg>

  return (
    props.main ? (
      <div className='content-wrapper'>
        <div className='row h-100'>
          <div className='col-12 h-100'>
            <div className='card h-100'>
              <div className='card-body h-100'>
                <div className='row justify-content-center align-items-center h-100'>

                  <div className='col-2'>
                    {spinner}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className='row h-100'>
        <div className='col-12 h-100'>
          <div className='card h-100'>
            <div className='card-body h-100'>
              <div className='row justify-content-center align-items-center h-100'>

                <div className='col-2'>
                  {spinner}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

Loading.propTypes = {
  main: PropTypes.bool
}

export default Loading