import PropTypes from 'prop-types';
import Timer from './Timer';
import Guide from './Guide';

const Header = ({ time, score }) => (
  <div>
    <header className="header">
      <h1 className="header__title">MK: Test your sight</h1>
      <section className="header__gameinfo">
        <div>
          <Guide />
        </div>
        <div>
          <Timer time={time} />
          <div>Score: {score}/3</div>
        </div>
      </section>
    </header>
  </div>
);

Header.propTypes = {
  time: PropTypes.number,
  score: PropTypes.number,
};

export default Header;
