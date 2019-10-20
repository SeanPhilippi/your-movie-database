import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import { setMessageStatus } from '../redux/actions';

class MessageBar extends PureComponent {
  render() {
    const {
      open,
      setMessageStatus,
      message
    } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={ open }
          onClose={ setMessageStatus }
          autoHideDuration={ 2000 }
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={
            <span className="message">
              { message }
            </span>
          }
        />
      </div>
    );
  };
};

MessageBar.propTypes = {
  open: PropTypes.bool.isRequired,
  setMessageStatus: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  open: state.open,
  message: state.message
});

const mapDispatchToProps = dispatch => ({
  setMessageStatus: message => dispatch(setMessageStatus(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageBar);