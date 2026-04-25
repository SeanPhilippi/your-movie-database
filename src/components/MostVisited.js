import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMostVisited } from '../redux/actions';
import { MostVisitedSkeleton } from './skeletons/HomeSkeletons';

const MostVisited = ({ mostVisited, mostVisitedLoading, user, num, fullPage, fetchMostVisited }) => {
  useEffect(() => {
    fetchMostVisited(num);
  }, []);

  if (mostVisitedLoading) {
    return <MostVisitedSkeleton count={num} />;
  }

  if (!mostVisited.length) {
    return <div className='ml-3'>No visits recorded yet.</div>;
  }

  return (
    <div>
      <div className='top-movies-container'>
        {mostVisited.map(({ _id, username }, i) => (
          <div key={_id} className='d-flex bg-white justify-content-between viewable-item'>
            <div className='d-flex overflow-hidden'>
              <div className='viewable-item-rank no-plus'>
                <span className='number'>{i + 1}</span> &nbsp;
              </div>
              <Link
                to={`/profile${username === user.username ? '' : `/${username}`}`}
              >
                {username}
              </Link>
            </div>
          </div>
        ))}
      </div>
      {!fullPage && (
        <div>
          <hr className='mt-4' />
          <Link to='/most-visited'>Go to the list of the top 50 most visited</Link>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  mostVisited: state.mostVisited,
  mostVisitedLoading: state.mostVisitedLoading,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  fetchMostVisited: limit => dispatch(fetchMostVisited(limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MostVisited);
