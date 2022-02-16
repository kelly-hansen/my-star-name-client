import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FieldError } from '../../cdui'
import { useDispatch } from 'react-redux'
import { saveUserName } from '../../redux/actions/names'

const FirstNameForm = ({ setStep }) => {
  const dispatch = useDispatch()

  const formSchema = Yup.object().shape({
    firstName: Yup.string().trim().matches(/^[A-Za-z]+$/, 'Format is incorrect').required('This field is required')
  })

  const initialValues = {
    firstName: ''
  }

  const renderForm = ({ handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting, errors, values, touched }) => {
    return (
      <form onSubmit={handleSubmit} noValidate autoComplete='off' encType='multipart/form-data'>
        <div className='form-row'>
          <div className={errors.firstName && touched.firstName ? 'form-group has-danger col mb-0' : 'form-group col mb-0'}>
            <label htmlFor='firstName'>First Name</label>
            <input
              className={errors.firstName ? 'form-control form-control-danger' : 'form-control'}
              type='text'
              aria-label='firstName'
              name='firstName'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName} />
            <FieldError error={errors.firstName} touched={touched.firstName} />
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
            dispatch(saveUserName({ firstName: values.firstName }))
            setStep((currentStep) => currentStep + 1)
          }}>
          {renderForm}
        </Formik>
      </div>
    </div>
  )
}

FirstNameForm.propTypes = {
}

export default FirstNameForm
