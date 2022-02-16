import {
  API_CALL_BEGIN,
  API_CALL_END,
  SAVE_USER_NAME,
  SAVE_GENERATED_NAME,
  UPDATE_ALL_GENERATED_NAMES
} from '../actions/names'

const initialState = {
  userName: {
    firstName: null,
    lastName: null,
    number: null
  },
  generatedName: {},
  allGeneratedNames: null,
  loading: false
}

const namesReducer = (state = initialState, action) => {
  const { type, userName, generatedName, allGeneratedNames } = action
  switch (type) {
    case API_CALL_BEGIN:
      return { ...state, loading: true }

    case API_CALL_END:
      return { ...state, loading: false }

    case SAVE_USER_NAME:
      return ({
        ...state,
        userName: {
          firstName: userName.firstName ? userName.firstName : state.userName.firstName,
          lastName: userName.lastName ? userName.lastName : state.userName.lastName,
          number: userName.number ? userName.number : state.userName.number
        }
      })

    case SAVE_GENERATED_NAME:
      return { ...state, generatedName }

    case UPDATE_ALL_GENERATED_NAMES:
      return { ...state, allGeneratedNames }

    default:
      return state
  }
}

export default namesReducer
