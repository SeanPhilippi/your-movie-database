import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Rankings = ({ title, voters }) => (
  <div className="">
    <div className="font-weight-bold mb-1">
      User's that ranked { title }:
    </div>
    <div className="bg-white">
      {
        voters.map(user => (
          <div className="d-flex justify-content-between">
            <div className="bd-light row-height col-10">
              <Link to={`/profile/${ user.username }`}>
                { user.username }
              </Link>
            </div>
            <div className="bd-light row-height col-2 text-right">
              #{ user.rank }
            </div>
          </div>
        ))
      }
    </div>
  </div>
);

Rankings.propTypes = {
  movie: PropTypes.object.isRequired,
  voters: PropTypes.array
};

export default Rankings;
