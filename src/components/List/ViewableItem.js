import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ViewableItem = ({
  movie: {
    _id,
    title,
    director,
    year
  },
  movie,
  idx
}) => (
  <div
    key={ _id }
    className="d-flex bg-white justify-content-between"
    style={{ lineHeight: '2rem' }}
  >
    <div className="d-flex overflow-hidden">
      <div
        className="text-right"
        style={{ width: '2.6rem' }}
      >
        <span className="number">{ ++idx }</span> &nbsp;
      </div>
      <div
        title={`${ title } (${ director }, ${ year })`}
        className="d-inline-block text-truncate"
        style={{ maxWidth: '516px' }}
      >
        <Link
          to={{
            pathname: `/movies/${ title.concat('-', year).split(' ').join('-') }`,
            state: { movie }
          }}
        >
          { title }&nbsp;
        </Link>
        ({ director }, { year })
      </div>
    </div>
    <div className="align-self-end mr-2">
      {/* <a href={`http://www.imdb.com/title/${_id}/`}>
        IMDB
      </a> */}
    </div>
  </div>
);

ViewableItem.propTypes = {
  movie: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
};

export default ViewableItem;