import React from 'react'
import { Modal, ModalBody } from 'reactstrap'
import PropTypes from 'prop-types'

const AlertModal = ({ isOpen, toggle, button, children, icon, size = 'sm', title }) => {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} contentClassName='rounded' size={size}>
        <ModalBody className='text-center'>
          <div className='mb-3'>{icon}</div>
          <h5 className='mb-4'>{title}</h5>
          <div className='mb-4'>{children}</div>
          {button}
          <button className='btn btn-link btn-block' type='button' onClick={toggle}>Cancel</button>
        </ModalBody>
      </Modal>
    </div>
  )
}

AlertModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  button: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
  icon: PropTypes.element,
  size: PropTypes.string,
  title: PropTypes.string
}

export default AlertModal
