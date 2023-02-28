/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import DropDown from './components/DropDown';
import Header from './components/Header';
import TargetBox from './components/TargetBox';
import './sass/styles.scss';

const App = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [show, setShow] = useState(false);
  const [targetX, setTargetX] = useState(0);
  const [targetY, setTargetY] = useState(0);
  const [chars, setChars] = useState([
    { name: 'Raiden', id: uniqid() },
    { name: 'Subzero', id: uniqid() },
    { name: 'Jaxs', id: uniqid() },
  ]);

  useEffect(() => {
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
    setShow(true);
    setTargetX(e.pageX);
    setTargetY(e.pageY);
  };

  return (
    <div className="main-layout">
      <Header time={time} />
      <DropDown
        show={show}
        x={targetX}
        y={targetY}
        chars={chars}
        setChars={setChars}
      />
      <TargetBox show={show} x={targetX} y={targetY} />
      <main
        className="main-content"
        onClick={(handleStart, handleElementClick)}
        onKeyDown={handleStart}
      >
        <p>This is where the main picture will go for the photo tagging.</p>
      </main>
      <footer className="footer">
        <p className="footer__madeby">Made by Sean Kempt</p>
      </footer>
    </div>
  );
};

export default App;
