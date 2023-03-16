/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState, useEffect, useRef } from 'react';
import uniqid from 'uniqid';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  getDocs,
  orderBy,
  limit,
} from 'firebase/firestore';
import firebaseConfig from './firebase-config';
import Scoreboard from './components/Scoreboard';
import mkimage from './images/waldo-style-MK.jpeg';
import DropDown from './components/DropDown';
import Header from './components/Header';
import TargetBox from './components/TargetBox';
import AlertPopup from './components/AlertPopup';
import './sass/styles.scss';

const App = () => {
  const [username, setUsername] = useState('');
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(0);
  const [highscores, setHighscores] = useState([]);
  const [alert, setAlert] = useState({
    show: false,
    status: null,
  });
  const [coords, setCoords] = useState({
    targetX: 0,
    targetY: 0,
    adjCoords: { x: 0, y: 0 },
  });
  const [chars, setChars] = useState({
    Raiden: { name: 'Raiden', id: uniqid(), x: 38, y: 35 },
    Subzero: { name: 'Subzero', id: uniqid(), x: 55, y: 55 },
    Jaxs: { name: 'Jaxs', id: uniqid(), x: 85, y: 26 },
  });

  // ! Firebase stuff - probably need to move this to its own sperate file to not bog things down in this app file
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const logPlayerScore = async (initials, gameTime) => {
    try {
      const today = new Date();
      await addDoc(collection(db, 'games'), {
        name: [initials],
        time: [gameTime],
        date: today.toLocaleDateString(),
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  // gets data from firebase for the winner with the lowest amount of time
  const getHighScores = async () => {
    const q = query(collection(db, 'games'), orderBy('time'), limit(5));
    const querySnapshot = await getDocs(q);
    return querySnapshot.forEach((doc) => {
      console.log(highscores);
      return setHighscores((prevHs) => [...prevHs, doc.data()]);
    });
  };

  const isGameOver = () => {
    if (score >= 2) {
      setIsActive(false);
    }
  };

  // passed as prop to scoreboard for the initials submit button that way it sends the data to firebase
  const handleSubmit = () => {
    logPlayerScore(username, time);
    return getHighScores();
  };

  // Provides the timer that is available in the header
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  const handleStart = () => setIsActive(true);

  // Stops the timer and sets the timer back to zero
  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  const handlePlayAgain = () => {
    handleReset();
    setScore(0);
    setChars({
      Raiden: { name: 'Raiden', id: uniqid(), x: 38, y: 35 },
      Subzero: { name: 'Subzero', id: uniqid(), x: 55, y: 55 },
      Jaxs: { name: 'Jaxs', id: uniqid(), x: 85, y: 26 },
    });
  };

  // provides the x and y coordinate in a simple form with only two digits ; stays the same no matter the size of the photo
  const getImageClickCoords = (e) => {
    const xCoord = Math.round(
      (e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100
    );
    const yCoord = Math.round(
      (e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100
    );
    const newXY = { xCoord, yCoord };
    return newXY;
  };

  // This is what renders the target box on the main div element and sets coordinate state
  const handleElementClick = (e) => {
    setShow(!show);
    const newCoords = getImageClickCoords(e);
    setCoords((prevCoords) => ({
      ...prevCoords,
      targetX: e.nativeEvent.offsetX,
      targetY: e.nativeEvent.offsetY,
      adjCoords: { x: newCoords.xCoord, y: newCoords.yCoord },
    }));
  };

  // removes the items from the dropdown list after the user has successfully found the character
  const handleRemoveListItem = (c) => {
    const newChars = { ...chars };
    delete newChars[c];
    setChars(newChars);
  };

  const hideAlert = () => {
    setTimeout(() => {
      setAlert((prevAlert) => ({
        ...prevAlert,
        show: false,
      }));
    }, 3000);
  };

  const handleAlerts = (flag) => {
    setAlert((prevAlert) => ({
      ...prevAlert,
      show: true,
      status: flag,
    }));
    hideAlert();
  };

  const handleScoreIncrease = () => setScore(score + 1);

  const handleHideTargetBox = () => setShow(false);

  // Triggers once the user has clicked on the dropdown of a character name and preforms the checks if its valid
  const checkIfValid = (charName) => {
    // todo: I really should clean up this function, looks really messy and big
    // the reason for all of the checks here is to give some leeway for users that click in different spots near the character. if it is within +/- 3 its correct.
    if (
      coords.adjCoords.x <= chars[charName].x + 3 &&
      coords.adjCoords.x >= chars[charName].x - 3 &&
      coords.adjCoords.y <= chars[charName].y + 3 &&
      coords.adjCoords.y >= chars[charName].y - 3
    ) {
      handleAlerts('correct');
      handleScoreIncrease();
      isGameOver(); // checks if the score 3/3 is reached
      handleRemoveListItem(charName);
      handleHideTargetBox();
    } else {
      handleAlerts('incorrect');
      handleHideTargetBox();
    }
  };

  // custom hook to handle whenever the user clicks outside of the image to hide the targetbox
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

  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  const mkImageRef = useRef();

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
      {alert.show ? <AlertPopup alert={alert} /> : null}
      {score >= 3 ? (
        <Scoreboard
          handlePlayAgain={handlePlayAgain}
          username={username}
          handleNameChange={handleNameChange}
          handleSubmit={handleSubmit}
          highscores={highscores}
        />
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
        <p>Illustration by Gus Morais</p>
      </footer>
    </div>
  );
};

export default App;
