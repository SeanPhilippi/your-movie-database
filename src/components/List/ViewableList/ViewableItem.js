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
    className="d-flex bg-white justify-content-between viewable-item"
  >
    <div className="d-flex overflow-hidden">
      <div className="text-right pl-1 viewable-item-rank">
        <span className="number">{ ++idx }</span> &nbsp;
      </div>
      <div
        title={`${ title } (${ director }, ${ year })`}
        className="d-inline-block text-truncate viewable-item-text"
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
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
  }),
  idx: PropTypes.number.isRequired,
};

export default ViewableItem;