import React from 'react';
import PropTypes from 'prop-types';
import withLoading from './HOCs/withLoading';

const MovieStats = withLoading(({
  stats: {
    averageRanking,
    points,
    overallRanking,
    voters
  },
}) => (
  <div className="mt-4">
    <div className="font-weight-bold mb-1">
      Statistics
    </div>
    <div className="bg-white">
      <div className="d-flex justify-content-between">
        <div className="bd-light row-height col-9">
          Overall ranking:
        </div>
        <div className="bd-light row-height col-3 text-right">
          { overallRanking ? `#${ overallRanking }` : 'Not yet ranked.' }
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="bd-light row-height col-9">
          Number of points:
        </div>
        <div className="bd-light row-height col-3 text-right">
          { points || 0 }
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="bd-light row-height col-9">
          Number of users that ranked this movie:
        </div>
        <div className="bd-light row-height col-3 text-right">
          { voters.length || 0 }
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="bd-light row-height col-9">
          Average user ranking:
        </div>
        <div className="bd-light row-height col-3 text-right">
          { averageRanking ? `#${ averageRanking }` : 'Not yet ranked.' }
        </div>
      </div>
    </div>
  </div>
));

MovieStats.propTypes = {
  movie: PropTypes.shape({
    voters: PropTypes.array.isRequired,
    averageRanking: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
    overallRanking: PropTypes.number.isRequired,
  })
};

export default MovieStats;