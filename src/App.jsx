/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState, useEffect, useRef } from 'react';
import uniqid from 'uniqid';
import mkimage from './images/waldo-style-MK.jpeg';
import DropDown from './components/DropDown';
import Header from './components/Header';
import TargetBox from './components/TargetBox';
import './sass/styles.scss';

const App = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(0);
  const [coords, setCoords] = useState({
    targetX: 0,
    targetY: 0,
    adjCoords: { x: 0, y: 0 },
  });
  const [chars, setChars] = useState({
    Raiden: { name: 'Raiden', id: uniqid(), x: 38, y: 35 },
    Subzero: { name: 'Subzero', id: uniqid(), x: 2, y: 35 },
    Jaxs: { name: 'Jaxs', id: uniqid(), x: 85, y: 26 },
  });

  useEffect(() => {
    // Provides the timer that is available in the header
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // ! idk about this...it really should just be using the state for time and not tis previous time.
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  const handleStart = () => setIsActive(true);

  // const handleReset = () => {
  //   setIsActive(false);
  //   setTime(0);
  // };

  const handleElementClick = (e) => {
    // This is what renders the target box on the main div element and sets coordinate state
    setShow(!show);
    const newCoords = getImageClickCoords(e);
    setCoords((prevCoords) => ({
      ...prevCoords,
      targetX: e.nativeEvent.offsetX,
      targetY: e.nativeEvent.offsetY,
      adjCoords: { x: newCoords.xCoord, y: newCoords.yCoord },
    }));
  };

  const handleRemoveListItem = (c) => {
    const newChars = { ...chars };
    delete newChars[c];
    setChars(newChars);
  };

  const checkIfValid = (charName) => {
    // the reason for all of the checks here is to give some leeway for users that click in different spots near the character. if it is within +/- 3 its correct.
    if (
      coords.adjCoords.x <= chars[charName].x + 3 &&
      coords.adjCoords.x >= chars[charName].x - 3 &&
      coords.adjCoords.y <= chars[charName].y + 3 &&
      coords.adjCoords.y >= chars[charName].y - 3
    ) {
      console.log(`congratulations you are correct!`);
      handleScoreIncrease();
      handleRemoveListItem(charName);
      handleHideTargetBox();
    } else {
      console.log(`you are wrong, try again!`);
      handleHideTargetBox();
    }
  };

  const handleScoreIncrease = () => setScore(score + 1);

  const useOnClickOutside = (ref, handler) => {
    // custom hook to handle whenever the user clicks outside of the image to hide the targetbox
    useEffect(() => {
      const listener = (e) => {
        if (
          !ref.current ||
          ref.current.contains(e.target) ||
          e.target.className === 'dropdown__item'
        ) {
          return;
        }
        handler(e);
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    }, [ref, handler]);
  };

  const handleHideTargetBox = () => setShow(false);

  const mkImageRef = useRef();

  const getImageClickCoords = (e) => {
    // Provides the x and y coordinate of where on the image the user has clicked and removes the padding and other alterations.
    const xCoord = Math.round(
      (e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100
    );
    const yCoord = Math.round(
      (e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100
    );
    const newXY = { xCoord, yCoord };
    return newXY;
  };

  useOnClickOutside(mkImageRef, handleHideTargetBox);

  return (
    <div className="main-layout">
      <Header
        time={time}
        handleHideTargetBox={handleHideTargetBox}
        score={score}
      />
      {show ? (
        <div>
          <DropDown
            x={coords.targetX}
            y={coords.targetY}
            chars={chars}
            checkIfValid={checkIfValid}
          />{' '}
          <TargetBox x={coords.targetX} y={coords.targetY} />
        </div>
      ) : null}
      <main
        className="main-content"
        onClick={(e) => {
          handleStart();
          handleElementClick(e);
        }}
        onKeyDown={handleStart}
      >
        <img
          ref={mkImageRef}
          className="main-content__image"
          src={mkimage}
          alt="waldo style MK"
        />
      </main>
      <footer className="footer">
        <p className="footer__madeby">Made by Sean Kempt</p>
      </footer>
    </div>
  );
};

export default App;
