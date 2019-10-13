import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTopMoviesList } from '../../redux/actions';
import { Link, withRouter } from 'react-router-dom';

class ViewableList extends PureComponent {
  state = {
    currentPage: 1,
    moviesPerPage: 25,
    currentTopMovies: [],
  };

  componentDidMount() {
    console.log('viewablelist mounting')
    const { fetchTopMoviesList } = this.props;
    fetchTopMoviesList();
  };

  setCurrentPage = e => {
    this.setState({ currentPage: Number(e.target.name) });
    this.setCurrentTopMovies();
  };

  setCurrentTopMovies = () => {
    const {
      moviesPerPage,
      currentPage
    } = this.state;
    // 1: 0-24, 2: 25-49, 3: 50-74
    const startIdx = moviesPerPage * (currentPage - 1);
    const endIdx = startIdx + moviesPerPage;
    console.log('startIdx', startIdx, 'endIdx', endIdx)
    const currentTopMovies = this.props.topMoviesList.slice(startIdx, endIdx);
    console.log('current', currentTopMovies)
    this.setState({ currentTopMovies });
  };

  setMoviesPerPage = num => {

  };

  render() {
    const {
      items,
      topMoviesList
    } = this.props;
    const {
      moviesPerPage,
      currentPage
    } = this.state;

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

    const pages = [1,2,3,4,5];

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
      return this.state.currentTopMovies.map((item, idx) =>
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
      )
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
});

const mapStateToProps = state => ({
  topMoviesList: state.topMoviesList,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewableList));