import { useState, useEffect } from 'react';
import Header from './components/Header';
import './sass/styles.scss';

const App = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false); // should probably lift this state up to the app component that way it can be shared once a user clicks begin

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // idk about this...it really should just be using the state for time and not tis previous time.
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  const handleStart = () => setIsActive(true);

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  return (
    <div className="main-layout">
      <Header time={time} />
      <main className="main-content">
        <p>This is where the main picture will go for the photo tagging.</p>
      </main>
      <footer className="footer">
        <p className="footer__madeby">Made by Sean Kempt</p>
      </footer>
    </div>
  );
};

export default App;
