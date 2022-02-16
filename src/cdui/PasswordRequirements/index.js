import React from 'react'
import PropTypes from 'prop-types'

const PasswordRequirements = ({ passwordTouched, password, passwordToConfirm }) => {
  const AlertIcon = <span className='fas fa-exclamation-circle text-danger' />
  const CheckIcon = <span className='fas fa-check-circle text-success' />

  return (
    <div>
      {
        passwordTouched || password.length > 0
          ? (
            <div className=''>
              {password.length >= 6
                ? <small className='d-block d-md-inline-block mt-1 text-success px-2'>{CheckIcon} Use 6 or more characters</small>
                : <small className='d-block d-md-inline-block mt-1 text-danger px-2'>{AlertIcon} Use 6 or more characters</small>
              }

              {/[A-Z]/.test(password)
                ? <small className='d-block d-md-inline-block mt-1 text-success px-2'>{CheckIcon} At least 1 uppercase letter</small>
                : <small className='d-block d-md-inline-block mt-1 text-danger px-2'>{AlertIcon} At least 1 uppercase letter</small>
              }

              {/\d/.test(password)
                ? <small className='d-block d-md-inline-block mt-1 text-success px-2'>{CheckIcon} At least 1 number</small>
                : <small className='d-block d-md-inline-block mt-1 text-danger px-2'>{AlertIcon} At least 1 number</small>
              }

              {password.length > 0 && (passwordToConfirm === password)
                ? <small className='d-block d-md-inline-block mt-1 mb-2 text-success px-2'>{CheckIcon} Both passwords must match</small>
                : <small className='d-block d-md-inline-block mt-1 mb-2 text-danger px-2'>{AlertIcon} Both passwords must match</small>
              }
            </div>
          ) : (
            <div className=''>
              <small className='d-block d-md-inline-block mt-1 px-2'>Use 6 or more characters</small>
              <small className='d-block d-md-inline-block mt-1 px-2'>At least 1 uppercase letter</small>
              <small className='d-block d-md-inline-block mt-1 px-2'>At least 1 number</small>
              <small className='d-block d-md-inline-block mt-1 mb-2 px-2'>Both passwords must match</small>
            </div>
          )
      }
    </div>
  )
}

PasswordRequirements.propTypes = {
  passwordTouched: PropTypes.bool,
  password: PropTypes.string,
  passwordToConfirm: PropTypes.string
}

export default PasswordRequirements
