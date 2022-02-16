import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { startGenerateName, saveGeneratedName } from '../redux/actions/names'
import { Loading } from '../cdui'
import { history } from '../routers/AppRouter'
import EmailName from './EmailName'

const DisplayName = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    return () => dispatch(saveGeneratedName({}))
  }, [])

  const loading = useSelector(state => state.names.loading)
  const generatedName = useSelector(state => state.names.generatedName.name)

  return (
    loading ? (
      <Fragment>
        <div className="py-5"></div>
        <Loading />
      </Fragment>
    ) : (
      <div className='row align-items-center justify-content-center m-0'>
        <div className='col-12 col-lg-4 py-5 text-center'>
          <div className='py-3 py-lg-5 px-3'></div>
          {generatedName ? (
            <Fragment>
              <h4>Your star name is</h4>
              <h3 className='text-success py-5'>{generatedName}</h3>
            </Fragment>
          ) : (
            <Fragment>
              <h4 className='pb-4'>Something went wrong</h4>
              <button className='btn btn-primary w-100 mb-3' onClick={() => dispatch(startGenerateName())}>Try Again</button>
            </Fragment>
          )}
          <button className='btn btn-primary w-100' onClick={() => history.push('/')}>Start Over</button>
          {generatedName && <EmailName generatedName={generatedName} />}
        </div>
      </div>
    )
  )
}

DisplayName.propTypes = {
}

export default DisplayName
