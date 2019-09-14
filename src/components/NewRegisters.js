import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NewRegistersBox from './NewRegistersBox';
import CardWrapper from './CardWrapper';
import { connect } from 'react-redux';

class NewRegisters extends PureComponent {
  render() {
    return (
      <div className="d-flex border-0 justify-content-center">
        <div className="inner-container mt-4 mx-4 p-0">
          <div className="bg-white pt-2 col">
            <CardWrapper
              title="new registers"
              icon="file-contract"
              rotate={ -5 }
              color="tan"
            >
              <NewRegistersBox registerPage num={50} />
            </CardWrapper>
          </div>
        </div>
      </div>
    )
  }
}

NewRegisters.propTypes = {
  newUsers: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  newUsers: state.newUsers
});

export default connect(mapStateToProps)(NewRegisters);
