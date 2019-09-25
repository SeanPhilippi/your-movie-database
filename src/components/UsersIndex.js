import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CardWrapper from './HOCs/CardWrapper';
import Search from './Search';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

class UsersIndex extends PureComponent {

  render() {
    return (
      <div className="d-flex border-0 justify-content-center">
        <div className="inner-container mt-4 mx-4 p-0">
          <Col className="bg-white pt-2">
            <CardWrapper
              title="search for a user"
              icon="search"
              rotate={ -5 }
              color="tan"
            >
              <Search users={ this.props.users } />
            </CardWrapper>
            <CardWrapper
              title="users index"
              icon="file-alt"
              rotate={ -5 }
              color="tan"
            >

            </CardWrapper>
          </Col>
        </div>
      </div>
    )
  }
}

UsersIndex.propTypes = {
  newUsers: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  users: state.newUsers
});

export default connect(mapStateToProps)(UsersIndex);