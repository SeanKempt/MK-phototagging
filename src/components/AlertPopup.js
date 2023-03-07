import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';

const AlertPopup = ({ alert }) => {
  if (alert.status === 'correct') {
    return (
      <Alert className="alert" variant="success">
        <Alert.Heading>Correct! Keep it going!</Alert.Heading>
      </Alert>
    );
  }
  if (alert.status === 'incorrect') {
    return (
      <Alert className="alert" variant="danger">
        <Alert.Heading>Incorrect! Please try again.</Alert.Heading>
      </Alert>
    );
  }
};

AlertPopup.propTypes = {
  alert: PropTypes.object,
};

export default AlertPopup;
