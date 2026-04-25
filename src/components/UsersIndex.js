import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CardWrapper from './HOCs/CardWrapper';
import Search from './Search';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

const UsersIndex = ({ users, user }) => {
  const sorted = [...users].sort((a, b) => a.username.localeCompare(b.username));

  return (
    <div className='d-flex border-0 justify-content-center w-100' style={{ flex: 1 }}>
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
          >
            <div className='py-2 bg-white'>
              <div className='mb-2 mx-3 pl-3 registered-users-count'>{users.length} registered users</div>
              <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                {sorted.map(({ _id, username }) => (
                  <div key={_id} className='py-1 pl-3'>
                    <Link to={`/profile${username === user.username ? '' : `/${username}`}`}>
                      {username}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </CardWrapper>
        </Col>
      </div>
    </div>
  );
};

UsersIndex.propTypes = {
  users: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  users: state.newUsers,
  user: state.user,
});

export default connect(mapStateToProps)(UsersIndex);
