import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

const Scoreboard = ({ handlePlayAgain }) => {
  const show = true;

  return (
    <div className="scoreboard">
      <Modal
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title className="scoreboard__title">
            Game Over! All Character's found!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="modal__body__subtext">Test your sight leaderboards</p>
          <hr />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handlePlayAgain}>
            Play Again
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

Scoreboard.propTypes = {
  handlePlayAgain: PropTypes.func,
};

export default Scoreboard;
