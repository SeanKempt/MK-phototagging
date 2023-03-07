/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';
// needs to be passed the handleElementClick prop so that way it can determine if things were correct or not.
const DropDown = ({ x, y, chars, checkIfValid }) => (
  <div
    className="dropdown"
    style={{
      position: 'absolute',
      left: `${x + 25}px`,
      top: `${y - 50}px`,
    }}
  >
    <ul>
      {Object.entries(chars).map(([key, value]) => (
        <li
          key={value.id}
          className="dropdown__item"
          onClick={() => checkIfValid(key)}
          onKeyDown={() => checkIfValid(key)}
        >
          {key}
        </li>
      ))}
    </ul>
  </div>
);

DropDown.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  chars: PropTypes.object,
  checkIfValid: PropTypes.func,
};

export default DropDown;
