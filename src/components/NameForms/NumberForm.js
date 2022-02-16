import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FieldError } from '../../cdui'
import { useDispatch } from 'react-redux'
import { saveUserName, startGenerateName } from '../../redux/actions/names'
import Select from 'react-select'
import { history } from '../../routers/AppRouter'

const NumberForm = () => {
  const dispatch = useDispatch()

  const options = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 }
  ]

  const formSchema = Yup.object().shape({
    number: Yup.number().typeError('Please select a number from the list').min(1).max(10)
  })

  const initialValues = {
    number: null
  }

  const renderForm = ({ handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting, errors, values, touched }) => {
    return (
      <form onSubmit={handleSubmit} noValidate autoComplete='off'>
        <div className='form-row'>
          <div className={errors.number && touched.number ? 'form-group has-danger col mb-0' : 'form-group col mb-0'}>
            <label htmlFor='number'>Pick a Number</label>
            <Select
              value={options.find((option) => option.value === values.number)}
              options={options}
              onChange={(value) => setFieldValue('number', value.value)} />
            <FieldError error={errors.number} touched={touched.number} />
          </div>
        </div>
        <div className='col-12 p-0'>
          <button type='submit' className='btn btn-primary btn-block my-2' disabled={isSubmitting}>Submit</button>
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
            dispatch(saveUserName({ number: values.number }))
            dispatch(startGenerateName())
            history.push('/display-name')
          }}>
          {renderForm}
        </Formik>
      </div>
    </div>
  )
}

NumberForm.propTypes = {
}

export default NumberForm
