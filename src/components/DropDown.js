/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';

const DropDown = ({ x, y, chars, setChars }) => {
  const handleListItem = (c) => {
    // todo: if character choice is correct remove the character from the array and show a green pop up saying it was correct and increasing score by one.
    // todo: if character choice is incorrect show pop up saying it was incorrect and to try again.
    setChars(chars.filter((cs) => c.id !== cs.id));
  };

  return (
    <div
      className="dropdown"
      style={{
        position: 'absolute',
        left: `${x + 25}px`,
        top: `${y - 50}px`,
      }}
    >
      <ul>
        {chars.map((cs) => (
          <li
            onClick={() => handleListItem(cs)}
            onKeyDown={() => handleListItem(cs)}
            key={cs.id}
            className="dropdown__item"
          >
            {cs.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

DropDown.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  chars: PropTypes.array,
  setChars: PropTypes.func,
};

export default DropDown;
