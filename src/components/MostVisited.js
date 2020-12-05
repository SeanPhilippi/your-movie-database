import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class MostVisitedList extends PureComponent {
  render() {
    const { newUsers, num, user } = this.props;

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
}

const mapStateToProps = state => ({
  newUsers: state.newUsers,
  user: state.user,
});

export default connect(mapStateToProps)(MostVisitedList);
