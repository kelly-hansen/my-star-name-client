import axios from '../../utils/axios'
import { toast } from 'react-toastify'

// DEFINITIONS
export const API_CALL_BEGIN = 'API_CALL_BEGIN'
export const API_CALL_END = 'API_CALL_END'

export const SAVE_USER_NAME = 'SAVE_USER_NAME'
export const SAVE_GENERATED_NAME = 'SAVE_GENERATED_NAME'

export const UPDATE_ALL_GENERATED_NAMES = 'UPDATE_ALL_GENERATED_NAMES'

// ACTION CREATORS
export const apiCallBegin = () => ({ type: API_CALL_BEGIN })
export const apiCallEnd = () => ({ type: API_CALL_END })

export const saveUserName = (userName) => ({ type: SAVE_USER_NAME, userName })
export const saveGeneratedName = (generatedName) => ({ type: SAVE_GENERATED_NAME, generatedName })

export const updateAllGeneratedNames = (allGeneratedNames) => ({ type: UPDATE_ALL_GENERATED_NAMES, allGeneratedNames })

export const startGenerateName = () => {
  return async(dispatch, getState) => {
    dispatch(apiCallBegin())
    try {
      const userName = getState().names.userName
      const response = await axios.post(`${baseURL}/generate`, userName)
      const generatedName = response.data
      dispatch(saveGeneratedName(generatedName))
      dispatch(apiCallEnd())
      toast.success('You are a STAR!')
    } catch (error) {
      console.error(error.response)
      dispatch(saveGeneratedName({}))
      dispatch(apiCallEnd())
      toast.error(`Something went wrong. Maybe you aren't star material.`)
    }
  }
}

export const startGetAllGeneratedNames = () => {
  return async(dispatch, getState) => {
    dispatch(apiCallBegin())
    try {
      const { data } = await axios.get(`${baseURL}/names`)
      dispatch(updateAllGeneratedNames(data))
      dispatch(apiCallEnd())
      toast.success('Look at all these famous people!')
    } catch (error) {
      console.error(error)
      dispatch(apiCallEnd())
      toast.error('Something went wrong. Please try again later.')
    }
  }
}

export const startEmailStarName = (payload) => {
  return async(dispatch, getState) => {
    dispatch(apiCallBegin())
    try {
      await axios.post(`${baseURL}/email`, payload)
      dispatch(apiCallEnd())
      toast.success('Email sent!')
    } catch (error) {
      console.error(error)
      dispatch(apiCallEnd())
      toast.error('An error occurred. Please try again.')
    }
  }
}
