import React from 'react'
import { Modal, ModalBody } from 'reactstrap'
import PropTypes from 'prop-types'

const DeleteModal = ({ isOpen, toggle, item, onClick, title }) => {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} contentClassName='rounded' size='sm'>
        <ModalBody className='text-center'>
          <span className='fas fa-trash text-danger d-block mb-3' style={{ fontSize: '50px' }} />
          {title && <h4 className='text-center mb-4'>{title}</h4>}
          <p className='text-center mb-1'>Are you sure you want to delete: </p>
          <p className='text-center f-bold' >{item}</p>
          <button className='btn btn-danger btn-block mt-4' type='button' onClick={onClick}>Yes, Delete</button>
          <button className='btn btn-link btn-block' type='button' onClick={toggle}>Cancel</button>
        </ModalBody>
      </Modal>
    </div>
  )
}

DeleteModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  item: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string
}

export default DeleteModal
