import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import imdbLogo from '../../../images/imdb-logo.gif';
import plusIcon from '../../../images/plus.png';

const ViewableItem = ({
  movie: {
    _id,
    title,
    director,
    year,
    points,
    id
  },
  history: {
    location: {
      pathname
    }
  },
  movie,
  idx,
  handleAdd,
  maxWidth
}) => (
  <div
    key={ _id }
    className="d-flex bg-white justify-content-between viewable-item"
  >
    <div className="d-flex overflow-hidden">
      <div className="text-right pl-1 viewable-item-rank">
        {
          pathname !== '/profile' &&
          <img
            onClick={ () => handleAdd(movie, true) }
            className="plus"
            src={ plusIcon }
            alt="add movie"
          />
        }
        <span className="number">{ ++idx }</span> &nbsp;
      </div>
      <div
        title={`${ title } (${ director }, ${ year })`}
        alt={`${ title } (${ director }, ${ year })`}
        className="d-inline-block text-truncate"
        style={{ maxWidth }}
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
    <div
      className={`align-self-end d-flex ${ points ? 'justify-content-between' : 'justify-content-end' } mr-2`}
      style={{ width: points ? '6rem' : '2.6rem' }}
    >
      {
        points &&
          <div className="points">
            { points } pts
          </div>
      }
        <a
          href={`http://www.imdb.com/title/${ id }/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={ imdbLogo } alt="imdb-link"/>
        </a>
    </div>
  </div>
);

ViewableItem.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    director: PropTypes.string,
    year: PropTypes.string.isRequired,
  }),
  idx: PropTypes.number.isRequired,
  addToList: PropTypes.func,
};

const mapStateToProps = state => ({
  items: state.items
});

export default withRouter(connect(mapStateToProps)(ViewableItem));