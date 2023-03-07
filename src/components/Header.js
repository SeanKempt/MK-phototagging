import PropTypes from 'prop-types';
import Timer from './Timer';

const Header = ({ time, score }) => (
  <div>
    <header className="header">
      <h1 className="header__title">MK: Test your sight</h1>
      <section className="header__gameinfo">
        <Timer time={time} />
        <div>Score: {score}/3</div>
      </section>
    </header>
  </div>
);

Header.propTypes = {
  time: PropTypes.number,
  score: PropTypes.number,
};

export default Header;
