import React from 'react';
import PropTypes from 'prop-types';
import withLoading from './HOCs/withLoading';
import { Link } from 'react-router-dom';

const Rankings = withLoading(({ title, voters }) => (
  <div className="">
    <div className="font-weight-bold mb-1">
      User's that ranked { title }:
    </div>
    <div className="bg-white">
      {
        voters.map(({ _id, username, rank }) => (
          <div
            className="d-flex justify-content-between"
            key={ _id }
          >
            <div className="bd-light row-height col-10">
              <Link to={`/profile/${ username }`}>
                { username }
              </Link>
            </div>
            <div className="bd-light row-height col-2 text-right">
              #{ rank }
            </div>
          </div>
        ))
      }
    </div>
  </div>
));

Rankings.propTypes = {
  title: PropTypes.string,
  voters: PropTypes.array
};

export default Rankings;