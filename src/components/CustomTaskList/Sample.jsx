import React, { useState } from 'react';
import { withTaskContext } from '@twilio/flex-ui';
import './sampleStyles.css'; 
import { Theme } from '@twilio-paste/core/theme';
import SampleModal from './SampleModal';
import axios from 'axios';

const Sample = (props) => {

  const jsonData = props?.task?.attributes?.failureData;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');

  const openModal = (description) => {
    setModalIsOpen(true);
    setSelectedDescription(description);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDescription('');
  };

  const [jiraTicketResponse, setJiraTicketResponse] = useState(null);

  const createJiraTicket = () => {
    axios
      .post('https://ashish-5111.twil.io/jiraticket')
      .then((response) => {
        console.log('Jira ticket created:', response.data);
        setJiraTicketResponse(response.data);
      })
      .catch((error) => {
        console.error('Error creating Jira ticket:', error);
        setJiraTicketResponse('Error creating Jira ticket');
      });
  };

  const allStatusesTrue = jsonData && jsonData.failures.every(failure => failure.status === 'true');

  return (
    <Theme.Provider theme="default">
      {jsonData && (
        <div className="container">
          <div className="customer-details">
            <h1>Customer Details</h1>
            <p>{props?.task?.attributes?.CustomerData?.Customer[0]?.fullname}</p>
            <p>{props?.task?.attributes?.CustomerData?.Customer[0]?.emailaddress}</p>
            <p>{props?.task?.attributes?.cardType}</p>
          </div>
          <div className="dropdowns">
            <h1 className='failure-reasons-heading'>Failure Reasons:</h1>
            <div className="grid-container">
              {jsonData.failures.map((failure, index) => (
                <div
                  className={`grid-item ${failure.status === 'true' ? 'status-true' : ''}`}
                  key={index}
                  onClick={() => {
                    if (failure.status !== 'true') {
                      openModal(failure.description);
                    }
                  }}
                >
                  <div><strong>Reason:</strong> {failure.reason}</div>
                  <div><strong>Status:</strong> {failure.status}</div>
                  {failure.status === 'true' && (
                    <div className="checkmark">&#10003;</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="additional-info">
              <p>
                Clicking on the failed reason will give you recommendations to solve the issue.
              </p>
            </div>
          {allStatusesTrue && (
            <div className="additional-info">
              <p>
                If all the above reasons pass, make sure with the customer if he/she had made the transaction
                and create a ticket.
              </p>
              <div style={{ marginTop: '10px' }} />
              <button onClick={createJiraTicket}>Submit a ticket</button>
              <div style={{ marginTop: '10px' }} />
              {jiraTicketResponse && (
                <p style={{ color: 'green' }}>{jiraTicketResponse}</p>
              )}
            </div>
          )}

        </div>
      )}
      <SampleModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        text={`${selectedDescription}`}
      />
    </Theme.Provider>
    );
  };

export default withTaskContext(Sample);
