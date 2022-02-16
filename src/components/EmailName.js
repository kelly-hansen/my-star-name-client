import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import useToggle from '../hooks/useToggle'
import { ContentModal, FieldError } from '../cdui'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { startEmailStarName } from '../redux/actions/names'

const EmailName = ({ generatedName }) => {
  const dispatch = useDispatch()

  const [isOpen, toggle] = useToggle()

  const formSchema = Yup.object().shape({
    email: Yup.string().email('Please provide a valid email').trim().required('This field is required')
  })

  const initialValues = {
    email: ''
  }

  const renderForm = ({ handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting, errors, values, touched }) => {
    return (
      <form onSubmit={handleSubmit} noValidate autoComplete='off' encType='multipart/form-data'>
        <div className='form-row'>
          <div className={errors.email && touched.email ? 'form-group has-danger col mb-0' : 'form-group col mb-0'}>
            <label htmlFor='email'>Email</label>
            <input
              className={errors.email ? 'form-control form-control-danger' : 'form-control'}
              type='text'
              aria-label='email'
              name='email'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email} />
            <FieldError error={errors.email} touched={touched.email} />
          </div>
        </div>
        <div className='col-12 p-0'>
          <button type='submit' className='btn btn-primary btn-block my-2' disabled={isSubmitting}><span className='fas fa-envelope'></span> Send</button>
        </div>
      </form>
    )
  }

  return (
    <Fragment>
      <ContentModal
        isOpen={isOpen}
        toggle={toggle}
        title='Share via Email'
        size='sm'>
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={(values, actions) => {
            const payload = { email: values.email, starName: generatedName }
            toggle()
            dispatch(startEmailStarName(payload))
          }}>
          {renderForm}
        </Formik>
      </ContentModal>
      <button className='btn btn-info w-100 mt-3' onClick={toggle}><span className='fas fa-envelope'></span> Share via Email</button>
    </Fragment>
  )
}

EmailName.propTypes = {
  generatedName: PropTypes.string
}

export default EmailName
