import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

const Scoreboard = ({
  handlePlayAgain,
  username,
  handleNameChange,
  handleSubmit,
  highscores,
}) => {
  const show = true;
  const [showForm, setShowForm] = useState(true);
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
          {showForm ? (
            <form className="scoreboard__form">
              <label htmlFor="userinitials" className="scoreboard__form--title">
                Enter your initials
              </label>
              <input
                className="scoreboard__form--input"
                type="text"
                name="userinitials"
                id="userinitials"
                value={username}
                onChange={handleNameChange}
              />
              <button
                type="button"
                onClick={() => {
                  handleSubmit();
                  setShowForm(false);
                }}
              >
                Submit
              </button>
            </form>
          ) : null}
          <p className="modal__body__subtext">Test your sight leaderboards</p>
          <div className="modal__body__highscores">
            <div className="modal__body__highscores--score score__labels">
              <p>Date</p>
              <p>Name</p>
              <p>Time</p>
            </div>
            {highscores.map((hs) => (
              // todo - get the time to show in mins:seconds for the time
              <div className="modal__body__highscores--score" key={uniqid()}>
                {' '}
                <p>{hs.date}</p>
                <p>{hs.name}</p>
                <p>{hs.time}</p>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handlePlayAgain()}>
            Play Again
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

Scoreboard.propTypes = {
  handlePlayAgain: PropTypes.func,
  username: PropTypes.string,
  handleNameChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  highscores: PropTypes.array,
};

export default Scoreboard;
