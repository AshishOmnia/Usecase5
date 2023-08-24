import React from 'react';
import Modal from 'react-modal';
import './styles.css'; // Make sure to adjust the path to your CSS file

const SampleModal = ({ isOpen, onClose, text }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Failure Reason"
      className="custom-modal" // Apply any additional styling needed
      overlayClassName="modal-overlay" // Apply styling for the modal overlay
    >
      <div className="modal-content">
        <div>{text}</div>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default SampleModal;
