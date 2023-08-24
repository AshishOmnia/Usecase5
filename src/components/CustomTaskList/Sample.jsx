import React, { useState } from 'react';
import { withTaskContext } from '@twilio/flex-ui';
import './styles.css'; 
import { Theme } from '@twilio-paste/core/theme';
import SampleModal from './SampleModal';

const Sample = (props) => {

  const jsonData = props?.task?.attributes?.failureData;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');

  const openModal = (reason) => {
    setModalIsOpen(true);
    setSelectedReason(reason);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedReason('');
  };

  return (
      <Theme.Provider theme="default">
        {jsonData && (
        <><div className="container">
          <div className="customer-details">
            <h1>Customer Details</h1>
            <p>{props?.task?.attributes?.customerName}</p>
            <p>{props?.task?.attributes?.cardType}</p>
          </div>
          <div className="dropdowns">
            <h1 className='failure-reasons-heading'>Failure Reasons:</h1>
            <div className="grid-container">
              {jsonData.failures.map((failure, index) => (
                <div
                  className={`grid-item ${failure.status === 'false' ? 'status-false' : ''}`}
                  key={index}
                  onClick={() => {
                    if (failure.status !== 'false') {
                      openModal(failure.reason);
                    }
                  } }
                >
                  <div><strong>Reason:</strong> {failure.reason}</div>
                  <div><strong>Status:</strong> {failure.status}</div>
                  {failure.status === 'false' && (
                    <div className="checkmark">&#10003;</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="additional-info">
            <p>
              If all the above reasons pass, ask the customer to make sure if they had made the transaction
              or ask customer to please call back again later as we havent received data from POS.
            </p>
          </div>
        </div><SampleModal
            isOpen={modalIsOpen}
            onClose={closeModal}
            text={`Reason: ${selectedReason}`} /></>
        )}
      </Theme.Provider>
    );
  };

export default withTaskContext(Sample);
