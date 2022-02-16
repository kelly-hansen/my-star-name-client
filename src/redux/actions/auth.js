import axios from '../../utils/axios'
import ls from 'local-storage'
import { history } from '../../routers/AppRouter'
import { toast } from 'react-toastify'

// DEFINITIONS
export const AUTH_BEGIN = 'AUTH_BEGIN'
export const AUTH_END = 'AUTH_END'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SIGN_UP = 'SIGN_UP'
export const SEND_FORGOT_PASSWORD_EMAIL = 'SEND_FORGOT_PASSWORD_EMAIL'
export const RESET_PASSWORD = 'RESET_PASSWORD'

export const SAVE_PRESCREENING_VALUES = 'SAVE_PRESCREENING_VALUES'
export const RESET_PRESCREENING_VALUES = 'RESET_PRESCREENING_VALUES'

export const SET_PASS_PRESCREENING = 'SET_PASS_PRESCREENING'
export const RESET_PASS_PRESCREENING = 'RESET_PASS_PRESCREENING'

export const CHECK_GEO_LOCATION = 'CHECK_GEO_LOCATION'
export const CHECK_AMI = 'CHECK_AMI'

export const ADD_SUBSCRIPTION_EMAIL = 'ADD_SUBSCRIPTION_EMAIL'
export const REPORT_FRAUD = 'REPORT_FRAUD'

// ACTION CREATORS
export const authBegin = () => ({ type: AUTH_BEGIN })
export const authEnd = () => ({ type: AUTH_END })

/* AHTU */
export const login = (currentUser = {}) => ({ type: LOGIN, currentUser })
export const logout = () => ({ type: LOGOUT })
export const signUp = (currentUser) => ({ type: SIGN_UP, currentUser })
export const sendForgotPasswordEmail = () => ({ type: SEND_FORGOT_PASSWORD_EMAIL })
export const resetPassword = () => ({ type: RESET_PASSWORD })

/* PRESCREENING */
export const savePrescreeningValues = (userType, userValues) => ({ type: SAVE_PRESCREENING_VALUES, userType, userValues })
export const resetPrescreeningValues = () => ({ type: RESET_PRESCREENING_VALUES })
export const setPassPrescreening = () => ({ type: SET_PASS_PRESCREENING })
export const resetPassPrescreening = () => ({ type: RESET_PASS_PRESCREENING })

/* CHECK GEO LOCATION */
export const checkGeoLocation = (isRestricted) => ({ type: CHECK_GEO_LOCATION, isRestricted })

/* CHECK AMI */
export const checkAMI = (amiEightyPercent, amiEightyPercentMonthly) => ({ type: CHECK_AMI, amiEightyPercent, amiEightyPercentMonthly })

/* SUBSCRIPTION EMAIL */
export const sendSubscriptionEmail = () => ({ type: ADD_SUBSCRIPTION_EMAIL })

/* REPORT FRAUD */
export const sendReportFraud = () => ({ type: REPORT_FRAUD })

// LOGIN
export const startLogin = (payload, setSubmitting) => {
  return async (dispatch, getState) => {
    dispatch(authBegin())
    try {
      const response = await axios.post(`${baseURL}/login`, payload)
      const { token, ...user } = response.data
      ls('authorization', token)
      dispatch(login(user))
      if (user.isLandlord) {
        history.push('/application/landlord')
      }
      if (user.isTenant) {
        history.push('/application/tenant')
      }
    } catch (error) {
      console.log(error.response)
      dispatch(authEnd())
      setSubmitting()
      toast.error('It looks like something went wrong. Please try again.')
    }
  }
}

// LOGOUT
export const startLogout = () => {
  return (dispatch, getState) => {
    ls.clear()
    dispatch(logout())
    history.push('/')
  }
}

// SIGN UP
export const startSignUp = (payload, setSubmitting) => {
  return async (dispatch, getState) => {
    dispatch(authBegin())
    try {
      const response = await axios.post(`${baseURL}/register`, payload)
      const { token, ...user } = response.data
      ls('authorization', token)
      dispatch(signUp(user))
      payload.type === 'landlord' && history.push('/application/landlord')
      payload.type === 'tenant' && history.push('/application/tenant')
    } catch (error) {
      console.log(error.response)
      dispatch(authEnd())
      setSubmitting()
      toast.error('It looks like something went wrong. Please try again.')
    }
  }
}

// SAVE PRESCREENING VALUES
export const startSavePrescreeningValues = (userType, userValues) => {
  return (dispatch, getState) => {
    dispatch(authBegin())
    try {
      dispatch(savePrescreeningValues(userType, userValues))
      if (ls('prescreening')) {
        const savedValues = ls('prescreening')
        const updatedValues = { ...savedValues, ...userValues }
        ls('prescreening', updatedValues)
      } else {
        ls('prescreening', userValues)
      }
    } catch (error) {
      console.log(error.response)
      dispatch(authEnd())
    }
  }
}

// RESET PRESCREENING VALUES
export const startResetPrescreeningValues = () => {
  return (dispatch, getState) => {
    dispatch(authBegin())
    try {
      if (ls('prescreening')) {
        ls.remove('prescreening')
      }
      dispatch(resetPrescreeningValues())
    } catch (error) {
      console.log(error.response)
      dispatch(authEnd())
    }
  }
}

// CHECK_GEO_LOCATION
export const startCheckGeoLocation = (zip, cb, setSubmitting) => {
  return async (dispatch, getState) => {
    dispatch(authBegin())
    try {
      const response = await axios.get(`${baseURL}/allowedGeolocation/${zip}`)
      dispatch(checkGeoLocation(response.data.isRestricted))
      const prescreenValues = getState().auth.prescreenValues

      if (response.data.isRestricted) {
        dispatch(startSavePrescreeningValues('tenant', { ...prescreenValues, isRestricted: true }))
        history.push({ pathname: '/ineligible' })
      } else {
        dispatch(startSavePrescreeningValues('tenant', { ...prescreenValues, isRestricted: false }))
        cb()
      }
    } catch (error) {
      console.log(error.response)
      dispatch(authEnd())
      setSubmitting()
      toast.error('It looks like something went wrong. Please try again.')
    }
  }
}

// CHECK_AMI
export const startCheckAMI = (zip, household) => {
  return async (dispatch, getState) => {
    dispatch(authBegin())
    try {
      const response = await axios.get(`${baseURL}/areaMedianIncome/${zip}/${household}`)
      const amiEightyPercent = response.data.amiEightyPercent
      const amiEightyPercentMonthly = response.data.amiEightyPercentMonthly
      dispatch(checkAMI(amiEightyPercent, amiEightyPercentMonthly))
    } catch (error) {
      console.log(error.response)
      dispatch(authEnd())
      toast.error('It looks like something went wrong. Please try again.')
    }
  }
}

// ADD_SUBSCRIPTION_EMAIL
export const startSendSubscriptionEmail = (payload, setSubmitting) => {
  return async (dispatch, getState) => {
    dispatch(authBegin())
    try {
      const response = await axios.post(`${baseURL}/ineligible`, payload)
      toast.success('Thank you for your interest in the Georgia Rental Assistance Progam. We will notify you of any program updates or changes.')
      setSubmitting()
      dispatch(sendSubscriptionEmail())
    } catch (error) {
      setSubmitting()
      console.log(error.response)
      dispatch(authEnd())
      toast.error('It looks like something went wrong. Please try again.')
    }
  }
}

// SEND_FORGOT_PASSWORD_EMAIL
export const startSendForgotPasswordEmail = (payload, setSubmitting, cb) => {
  return async (dispatch, getState) => {
    dispatch(authBegin())
    try {
      const response = await axios.post(`${baseURL}/sendVerificationEmail`, payload)
      setSubmitting()
      dispatch(sendForgotPasswordEmail())
      cb()
    } catch (error) {
      setSubmitting()
      console.log(error.response)
      dispatch(authEnd())
      toast.error('It looks like something went wrong. Please try again.')
    }
  }
}

// RESET_PASSWORD
export const startResetPassword = (payload, setSubmitting) => {
  return async (dispatch, getState) => {
    dispatch(authBegin())
    try {
      const response = await axios.post(`${baseURL}/resetPassword`, payload)
      dispatch(resetPassword())
      ls.clear()
      toast.success('Password updated. Please log back in.')
      history.push('/login')
    } catch (error) {
      setSubmitting()
      console.log(error.response)
      dispatch(authEnd())
      toast.error('It looks like something went wrong. Please try again.')
    }
  }
}

// REPORT_FRAUD
export const startSendReportFraud = (payload, setSubmitting) => {
  return async (dispatch, getState) => {
    dispatch(authBegin())
    try {
      const response = await axios.post(`${baseURL}/reportFraud`, payload)
      dispatch(sendReportFraud())
      toast.success('Thank you. Your fraud report has been submitted.')
      history.push('/')
    } catch (error) {
      setSubmitting()
      console.log(error.response)
      dispatch(authEnd())
      toast.error('It looks like something went wrong. Please try again.')
    }
  }
}
