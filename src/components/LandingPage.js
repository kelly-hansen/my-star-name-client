import React from 'react'
import { history } from '../routers/AppRouter'
import { useDispatch } from 'react-redux'
import { saveUserName, startGenerateName } from '../redux/actions/names'

const LandingPage = () => {
  const dispatch = useDispatch()

  const handleRandomNameClick = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    const randomUserName = {
      firstName: alphabet[Math.floor(Math.random() * 26)],
      lastName: alphabet[Math.floor(Math.random() * 26)],
      number: Math.ceil(Math.random() * 10)
    }
    dispatch(saveUserName(randomUserName))
    dispatch(startGenerateName())
    history.push('/display-name')
  }

  return (
    <div className='landing-page container-fluid px-0'>
      <div className='row align-items-center justify-content-center m-0'>
        <div className='col-12 col-md-5 col-lg-4 col-xl-3 text-center'>
          <div className='py-5 px-3'></div>
          <span className='fas fa-star landing-logo pb-3'></span>
          <h1 className='pb-3'>Find out your celebrity name!</h1>
          <button className='btn btn-primary w-100' onClick={() => history.push('/generate-name')}>Generate My Name</button>
          <button className='btn btn-info w-100 mt-3' onClick={handleRandomNameClick}>Generate Random Name</button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
