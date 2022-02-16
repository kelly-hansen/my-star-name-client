import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import PropTypes from 'prop-types'

const ContentModal = ({ isOpen, toggle, children, button, title, size = 'md', onClosed = () => {}, noCancel }) => {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} size={size} onClosed={onClosed}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          {children}
          {button}
          {!noCancel && <button className='btn btn-link btn-block' type='button' onClick={toggle}>Cancel</button>}
        </ModalBody>
      </Modal>
    </div>
  )
}

ContentModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
  button: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
  title: PropTypes.string,
  headerColor: PropTypes.string,
  size: PropTypes.string,
  onClosed: PropTypes.func,
  noCancel: PropTypes.bool
}

export default ContentModal
