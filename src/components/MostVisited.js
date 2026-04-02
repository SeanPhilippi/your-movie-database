import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MostVisitedSkeleton } from './skeletons/HomeSkeletons';

const MostVisitedList = ({ newUsers, num, user, newUsersLoading }) => {
  const User = ({ username, _id, visits }) => (
    <div key={_id} className='bg-white' style={{ lineHeight: '2rem' }}>
      <div className='d-flex justify-content-between overflow-hidden'>
        <div
          tltle={`${username})`}
          className='d-inline-block text-truncate'
          style={{ maxWidth: '516px' }}
        >
          <Link
            className='ml-3'
            to={`/profile${username === user.username ? '' : `/${username}`}`}
          >
            {username}
          </Link>
        </div>
        <div className='mr-3'>{/* { visits } visits */}</div>
      </div>
    </div>
  );

  if (newUsersLoading) {
    return <MostVisitedSkeleton count={num} />;
  }

  return (
    <div className='top-movies-container'>
      {newUsers
        .slice()
        .reverse()
        .slice(0, num)
        .map(user => (
          <User
            key={user._id}
            username={user.username}
            // visits={ user.visits }
          />
        ))}
    </div>
  );
}

const mapStateToProps = state => ({
  newUsers: state.newUsers,
  user: state.user,
  newUsersLoading: state.newUsersLoading,
});

export default connect(mapStateToProps)(MostVisitedList);
