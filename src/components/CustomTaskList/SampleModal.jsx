import React from 'react';
import Modal from 'react-modal';
import './sampleStyles.css'

const SampleModal = ({ isOpen, onClose, text }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Failure Reason"
      className="custom-modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-content">
        <div>{text}</div>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default SampleModal;
