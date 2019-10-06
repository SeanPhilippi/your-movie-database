import React from 'react';
import withLoading from './HOCs/withLoading';

const MovieStats = withLoading(({ voters, averageRanking }) => (
  <div className="mt-4">
    <div className="font-weight-bold mb-1">
      Statistics
    </div>
    <div className="bg-white">
      <div className="d-flex justify-content-between">
        <div className="bd-light row-height col-10">
          Overall Ranking:
        </div>
        <div className="bd-light row-height col-2 text-right">
          {/* rank */}
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="bd-light row-height col-10">
          Number of points:
        </div>
        <div className="bd-light row-height col-2 text-right">
          {/* points */}
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="bd-light row-height col-10">
          Number of users that ranked this movie:
        </div>
        <div className="bd-light row-height col-2 text-right">
          { voters.length }
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="bd-light row-height col-10">
          Average ranking in the user's list:
        </div>
        <div className="bd-light row-height col-2 text-right">
          #{ averageRanking }
        </div>
      </div>
    </div>
  </div>
));

export default MovieStats;