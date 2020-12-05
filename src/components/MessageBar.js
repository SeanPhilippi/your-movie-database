import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class MessageBar extends PureComponent {
  render() {
    const { open, message } = this.props;
    return (
      <div className={`messagebar ${open ? 'messagebar-open' : ''}`}>
        {message}
      </div>
    );
  }
}

MessageBar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string,
};

const mapStateToProps = state => ({
  open: state.open,
  message: state.message,
});

export default connect(mapStateToProps)(MessageBar);
