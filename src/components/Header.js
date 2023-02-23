import PropTypes from 'prop-types';
import Timer from './Timer';

const Header = ({ time }) => (
  <div>
    <header className="header">
      <h1 className="header__title">Where's MK</h1>
      <section className="header__gameinfo">
        <Timer time={time} />
        <div>Score: 0/3</div>
      </section>
    </header>
  </div>
);

Header.propTypes = {
  time: PropTypes.number,
};

export default Header;
