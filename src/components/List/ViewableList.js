import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchTopMoviesList,
  setCurrentTopMovies,
  setCurrentPage
} from '../../redux/actions';
import { Link, withRouter } from 'react-router-dom';

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

class ViewableList extends PureComponent {

  componentDidMount() {
    const { fetchTopMoviesList, setCurrentTopMovies } = this.props;
    fetchTopMoviesList();
    setCurrentTopMovies();
  };

  setCurrentPage = e => {
    this.props.setCurrentPage(Number(e.target.name));
    this.props.setCurrentTopMovies();
  };

  setMoviesPerPage = num => {

  };

  render() {
    const {
      items,
      topMoviesList,
      currentTopMovies,
      moviesPerPage,
      currentPage
    } = this.props;

    const pages = [1, 2, 3, 4];

    const PageSelect = () => (
      <div className="d-flex">
        {
          pages.map(page => (
            <div className="mr-2">
              <button
                onClick={ this.setCurrentPage }
                name={ page }
              >
                { page }
              </button>
            </div>
            )
          )
        }
      </div>
    );

    const NoList = () => (
      <div>
        This user hasn't added any movies yet.
      </div>
    );

    const TopMoviesList = () => {
      return currentTopMovies.map((item, idx) =>
        <ViewableItem
          movie={ item }
          idx={ idx + (moviesPerPage * (currentPage - 1)) }
          key={ item._id }
        />
      );
    };

    const TopMoviesListPreview = ({ itemsPerPage }) => {
      return topMoviesList.slice(0, itemsPerPage).map((item, idx) =>
        <ViewableItem
          movie={ item }
          idx={ idx }
          key={ item._id }
        />
      );
    };

    const UserList = () => {
      return items.map((item, idx) =>
        <ViewableItem
          movie={ item }
          idx={ idx }
          key={ item._id }
        />
      );
    };

    const whatToShow = () => {
      if (this.props.match.path === '/') {
        return <TopMoviesListPreview itemsPerPage={ 25 } />
      } else if (this.props.match.path === '/top-movies') {
        return (
          <>
            <PageSelect />
            <TopMoviesList />
          </>
        );
      } else if (!items.length) {
        return <NoList />
      } else {
        return <UserList />
      };
    };

    return (
      <div>
        { whatToShow() }
      </div>
    );
  };
};

ViewableList.propTypes = {
  items: PropTypes.array,
};

const mapDispatchToProps = dispatch => ({
  fetchTopMoviesList: () => dispatch(fetchTopMoviesList()),
  setCurrentPage: num => dispatch(setCurrentPage(num)),
  setCurrentTopMovies: () => dispatch(setCurrentTopMovies()),
});

const mapStateToProps = state => ({
  topMoviesList: state.topMoviesList,
  currentPage: state.currentPage,
  moviesPerPage: state.moviesPerPage,
  currentTopMovies: state.currentTopMovies,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewableList));