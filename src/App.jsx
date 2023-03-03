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
    setShow(!show);
    setTargetX(e.pageX);
    setTargetY(e.pageY);
  };

  const useOnClickOutside = (ref, handler) => {
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

  useOnClickOutside(mkImageRef, handleHideTargetBox);

  return (
    <div className="main-layout">
      <Header time={time} handleHideTargetBox={handleHideTargetBox} />
      {show ? (
        <div>
          <DropDown x={targetX} y={targetY} chars={chars} setChars={setChars} />{' '}
          <TargetBox x={targetX} y={targetY} />
        </div>
      ) : null}
      <main
        className="main-content"
        onClick={(handleStart, handleElementClick)}
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
