import React, { Fragment, useState } from 'react'
import Stepper from 'react-stepper-horizontal'
import FirstNameForm from './FirstNameForm'
import LastNameForm from './LastNameForm'
import NumberForm from './NumberForm'

const FormPage = () => {
  const [step, setStep] = useState(0)

  return (
    <Fragment>
      <div className='stepper-container pt-4'>
        <Stepper
          steps={[
            { title: 'First Name' },
            { title: 'Last Name' },
            { title: 'Number' }
          ]}
          activeStep={step} />
      </div>
      {step === 0 && <FirstNameForm setStep={setStep} />}
      {step === 1 && <LastNameForm setStep={setStep} />}
      {step === 2 && <NumberForm />}
    </Fragment>
  )
}

export default FormPage
