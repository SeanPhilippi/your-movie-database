import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import imdbLogo from '../../../images/imdb-logo.gif';
import plusIcon from '../../../images/plus.png';
import { addToList } from '../../../redux/actions';

const ViewableItem = ({
  movie: {
    _id,
    title,
    director,
    year,
    points,
    id
  },
  movie,
  idx,
  addToList
}) => (
  <div
    key={ _id }
    className="d-flex bg-white justify-content-between viewable-item"
  >
    <div className="d-flex overflow-hidden">
      <div className="text-right pl-1 viewable-item-rank">
        <img
          onClick={ movie => {
            console.log('adding movie', movie)
            addToList(movie)
          } }
          className="plus"
          src={ plusIcon }
          alt="add movie"
        />
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
    <div className={`align-self-end d-flex ${ points ? 'justify-content-between' : 'justify-content-end' } mr-2 pts-container`}>
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
    director: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
  }),
  idx: PropTypes.number.isRequired,
  addToList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  items: state.items
});

const mapDispatchToProps = dispatch => ({
  addToList: movie => dispatch(addToList(movie)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewableItem);