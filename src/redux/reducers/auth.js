import {
  AUTH_BEGIN,
  AUTH_END,
  LOGIN,
  LOGOUT,
  SIGN_UP,
  SAVE_PRESCREENING_VALUES,
  RESET_PRESCREENING_VALUES,
  SET_PASS_PRESCREENING,
  RESET_PASS_PRESCREENING,
  CHECK_GEO_LOCATION,
  CHECK_AMI,
  ADD_SUBSCRIPTION_EMAIL,
  SEND_FORGOT_PASSWORD_EMAIL,
  RESET_PASSWORD,
  REPORT_FRAUD
} from '../actions/auth'

const initialState = {
  currentUser: {},
  isLoggedIn: false,
  isPassedPrescreening: false,
  loading: false,
  prescreenType: '',
  prescreenValues: {},
  isRestricted: null,
  amiEightyPercent: null,
  amiEightyPercentMonthly: null
}

const authReducer = (state = initialState, action) => {
  console.log('Reducer: ', action)
  const { type, currentUser, userType, userValues, isRestricted, amiEightyPercent, amiEightyPercentMonthly } = action
  switch (type) {
    case AUTH_BEGIN:
      return { ...state, loading: true }

    case AUTH_END:
    case ADD_SUBSCRIPTION_EMAIL:
    case SEND_FORGOT_PASSWORD_EMAIL:
    case REPORT_FRAUD:
      return { ...state, loading: false }

    case RESET_PASSWORD: //! check this logic
      return initialState

    case SIGN_UP:
    case LOGIN:
      return { ...state, currentUser, isLoggedIn: true, loading: false }

    case LOGOUT:
      return { ...state, currentUser: {}, isLoggedIn: false, isPassedPrescreening: false, loading: false }

    case SAVE_PRESCREENING_VALUES:
      console.log(state)
      return { ...state, loading: false, prescreenType: userType, prescreenValues: { ...state.prescreenValues, ...userValues } }

    case RESET_PRESCREENING_VALUES:
      return { ...state, loading: false, prescreenType: '', prescreenValues: {}, isRestricted: null, amiEightyPercent: null }

    case SET_PASS_PRESCREENING:
      return { ...state, isPassedPrescreening: true, loading: false }

    case RESET_PASS_PRESCREENING:
      return { ...state, isPassedPrescreening: false, loading: false }

    case CHECK_GEO_LOCATION:
      return { ...state, isRestricted }

    case CHECK_AMI:
      return { ...state, amiEightyPercent, amiEightyPercentMonthly }

    default:
      return state
  }
}

export default authReducer
