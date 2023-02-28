import PropTypes from 'prop-types';

const TargetBox = ({ show, x, y }) => (
  <div
    className="targetbox"
    style={{
      display: show ? 'block' : 'none',
      position: 'absolute',
      left: `${x - 25}px`, // ! adjusted due to the box being offset for the picture
      top: `${y - 25}px`,
      border: '2px solid red',
      height: '50px',
      width: '50px',
    }}
  />
);

TargetBox.propTypes = {
  show: PropTypes.bool,
  x: PropTypes.number,
  y: PropTypes.number,
};

export default TargetBox;
