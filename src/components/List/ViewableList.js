import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { setTopMoviesList } from '../../redux/actions';
import { Link, withRouter } from 'react-router-dom';

class ViewableList extends PureComponent {
  componentDidMount() {
    const { setTopMoviesList } = this.props;
    console.log('viewable list mounting')
    axios('/api/movies/top-movies-list')
      .then(({ data }) => {
        setTopMoviesList(data);
      });
  };

  render() {
    const { items, itemsPerPage } = this.props;

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
            <span className="number">{ idx + 1 }</span> &nbsp;
          </div>
          <div
            tltle={`${ title } (${ director }, ${ year })`}
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

    const NoList = () => (
      <div>
        This user hasn't added any movies yet.
      </div>
    );

    const TopMoviesList = () => {
      return this.props.topMoviesList.slice(0, itemsPerPage).map((item, idx) =>
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
      if (this.props.match.path === '/' || this.props.match.path === '/top-movies') {
        return <TopMoviesList />
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
  setTopMoviesList: movies => dispatch(setTopMoviesList(movies)),
});

const mapStateToProps = state => ({
  topMoviesList: state.topMoviesList,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewableList));