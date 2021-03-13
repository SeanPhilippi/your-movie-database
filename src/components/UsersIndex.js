import React from 'react';
import PropTypes from 'prop-types';
import CardWrapper from './HOCs/CardWrapper';
import Search from './Search';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

const UsersIndex = ({ users }) => {
  <div className='d-flex border-0 justify-content-center'>
    <div className='inner-container mx-4'>
      <Col className='bg-white pt-2'>
        <CardWrapper
          title='search for a user'
          icon='search'
          rotate={-5}
          color='tan'
        >
          <Search users={users} />
        </CardWrapper>
        <CardWrapper
          title='users index'
          icon='file-alt'
          rotate={-5}
          color='tan'
        ></CardWrapper>
      </Col>
    </div>
  </div>
);

UsersIndex.propTypes = {
  newUsers: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  users: state.newUsers,
});

export default connect(mapStateToProps)(UsersIndex);
