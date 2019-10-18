import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { sortableElement } from 'react-sortable-hoc';
import DragHandle from './DragHandle';

const SortableItem = sortableElement(({ movie, sortIndex, deleteMovie }) => {
  const {
    id,
    title,
    director,
    year,
  } = movie;

  return (
    <div
      key={ id }
      className="bg-white"
      style={{ lineHeight: '2rem' }}
    >
      <div className="d-flex justify-content-between">
        <div className="d-flex overflow-hidden">
          <DragHandle sortIndex={ sortIndex } />
          <div
            title={`${ title } (${ director }, ${ year })`}
            className="d-inline-block text-truncate"
            style={{ maxWidth: '510px' }}
          >
            <Link
              className="movie-link"
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
        <button
          onClick={ () => deleteMovie(movie) }
          className="delete"
        >
          ✕
        </button>
      </div>
    </div>
  );
});

SortableItem.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
  }).isRequired,
  sortIndex: PropTypes.number.isRequired,
  deleteMovie: PropTypes.func.isRequired,
};

export default SortableItem;