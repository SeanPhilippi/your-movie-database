import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import withLoading from './HOCs/withLoading';

const Affinities = withLoading(({ affinities, user }) => (
  <div className="bg-white">
    {
      affinities.slice(0, 5).map(
        match => (
          <div className="d-flex justify-content-between">
            <div className="bd-light row-height col-10">
              <Link
                to={`/profile${ match.username === user.username ? '' : `/${ match.username }` }`}
              >
                { match.username }
              </Link>
            </div>
            <div className="bd-light row-height col-2 text-right">
              { match.score }%
            </div>
          </div>
        )
      )
    }
  </div>
));

Affinities.propTypes = {
  affinities: PropTypes.array
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Affinities);