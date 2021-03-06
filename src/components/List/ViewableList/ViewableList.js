import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageSettings from './PageSettings';
import ViewableItem from './ViewableItem';
import {
  fetchTopMoviesList,
  setCurrentTopMovies,
  setCurrentPage,
  setMoviesPerPage,
  addToList,
} from '../../../redux/actions';
import { withRouter } from 'react-router-dom';

class ViewableList extends PureComponent {
  componentDidMount() {
    const { fetchTopMoviesList, setCurrentTopMovies, history: { location: { pathname }} } = this.props;
    if (pathname === '/top-movies' || pathname === '/') {
      fetchTopMoviesList();
      setCurrentTopMovies();
    }
  }

  setCurrentPage = e => {
    this.props.setCurrentPage(Number(e.target.name));
    this.props.setCurrentTopMovies();
  };

  handleMoviesPerPage = e => {
    this.props.setMoviesPerPage(Number(e.target.value));
    this.props.setCurrentTopMovies();
  };

  handleAdd = (movie, post) => {
    const { isAuthenticated, addToList, history } = this.props;
    if (isAuthenticated) {
      addToList(movie, post);
    } else {
      history.push('/login');
    }
  };

  render() {
    const {
      items,
      user,
      match: { url },
      topMoviesList,
      currentTopMovies,
      moviesPerPage,
      pages,
      currentPage,
    } = this.props;

    const NoList = () => <div>This user hasn't added any movies yet.</div>;

    const TopMoviesList = () => {
      return currentTopMovies.map((item, idx) => (
        <ViewableItem
          movie={item}
          idx={idx + moviesPerPage * (currentPage - 1)}
          key={item._id}
          maxWidth='410px'
          handleAdd={() => this.handleAdd(item, true)}
        />
      ));
    };

    const TopMoviesListPreview = ({ itemsPerPage }) => {
      return topMoviesList
        .slice(0, itemsPerPage)
        .map((item, idx) => (
          <ViewableItem
            movie={item}
            idx={idx}
            key={item._id}
            maxWidth='390px'
            handleAdd={() => this.handleAdd(item, true)}
          />
        ));
    };

    const UserList = () => {
      let movies;
      if (url === '/profile' || url === `/profile/${user.username}`) {
        movies = user.items;
      } else {
        movies = items;
      }
      return movies.map((item, idx) => (
        <ViewableItem
          movie={item}
          idx={idx}
          key={item.id}
          maxWidth='490px'
          handleAdd={this.handleAdd}
        />
      ));
    };

    const whatToShow = () => {
      if (url === '/') {
        return <TopMoviesListPreview itemsPerPage={20} />;
      } else if (url === '/top-movies') {
        return (
          <>
            <PageSettings
              pages={pages}
              currentPage={currentPage}
              setCurrentPage={this.setCurrentPage}
              handleMoviesPerPage={this.handleMoviesPerPage}
              moviesPerPage={moviesPerPage}
            />
            <TopMoviesList />
          </>
        );
      } else if (items && !items.length) {
        return <NoList />;
      } else {
        return <UserList />;
      }
    };

    return <div>{whatToShow()}</div>;
  }
}

ViewableList.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  items: PropTypes.array,
  topMoviesList: PropTypes.array,
  currentTopMovies: PropTypes.array,
  moviesPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  fetchTopMoviesList: PropTypes.func.isRequired,
  setCurrentTopMovies: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  setMoviesPerPage: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addToList: (movie, post) => dispatch(addToList(movie, post)),
  fetchTopMoviesList: () => dispatch(fetchTopMoviesList()),
  setCurrentPage: num => dispatch(setCurrentPage(num)),
  setMoviesPerPage: num => dispatch(setMoviesPerPage(num)),
  setCurrentTopMovies: () => dispatch(setCurrentTopMovies()),
});

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
  user: state.user,
  topMoviesList: state.topMoviesList,
  currentPage: state.currentPage,
  pages: state.pages,
  moviesPerPage: state.moviesPerPage,
  currentTopMovies: state.currentTopMovies,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ViewableList)
);
