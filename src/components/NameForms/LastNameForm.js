import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FieldError } from '../../cdui'
import { useDispatch } from 'react-redux'
import { saveUserName } from '../../redux/actions/names'

const LastNameForm = ({ setStep }) => {
  const dispatch = useDispatch()

  const formSchema = Yup.object().shape({
    lastName: Yup.string().trim().matches(/^[A-Za-z]+$/, 'Format is incorrect').required('This field is required')
  })

  const initialValues = {
    lastName: ''
  }

  const renderForm = ({ handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting, errors, values, touched }) => {
    return (
      <form onSubmit={handleSubmit} noValidate autoComplete='off' encType='multipart/form-data'>
        <div className='form-row'>
          <div className={errors.lastName && touched.lastName ? 'form-group has-danger col mb-0' : 'form-group col mb-0'}>
            <label htmlFor='lastName'>Last Name</label>
            <input
              className={errors.lastName ? 'form-control form-control-danger' : 'form-control'}
              type='text'
              aria-label='lastName'
              name='lastName'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName} />
            <FieldError error={errors.lastName} touched={touched.lastName} />
          </div>
        </div>
        <div className='col-12 p-0'>
          <button type='submit' className='btn btn-primary btn-block my-2' disabled={isSubmitting}>Next</button>
        </div>
      </form>
    )
  }

  return (
    <div className='row align-items-center justify-content-center m-0'>
      <div className='col-12 col-lg-4 py-5'>
        <div className='py-3 py-lg-5 px-3'></div>
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={(values, actions) => {
            dispatch(saveUserName({ lastName: values.lastName }))
            setStep((currentStep) => currentStep + 1)
          }}>
          {renderForm}
        </Formik>
      </div>
    </div>
  )
}

LastNameForm.propTypes = {
}

export default LastNameForm
