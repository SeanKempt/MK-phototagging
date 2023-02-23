import PropTypes from 'prop-types';

const Timer = ({ time }) => (
  <div className="timer">
    <span className="timer__digits">
      {`0${Math.floor((time / 60000) % 60)}`.slice(-2)}:
    </span>
    <span className="timer__digits">
      {`0${Math.floor((time / 1000) % 60)}`.slice(-2)}.
    </span>
    <span className="timer__digits timer__mili-sec">
      {`0${(time / 10) % 100}`.slice(-2)}
    </span>
  </div>
);

Timer.propTypes = {
  time: PropTypes.number,
};

export default Timer;
