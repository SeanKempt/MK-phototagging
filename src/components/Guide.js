import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import charguide from '../images/MKcharacters.png';

const Guide = () => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="guidemodal">
      <Button
        variant="warning"
        onClick={handleShow}
        className="guidemodal__button"
      >
        Character Guide
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Character Guide</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="modal__body__subtext">
            Find all the characters to win!
          </p>
          <img src={charguide} alt="Mortal Kombat characters to look for" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Guide;
