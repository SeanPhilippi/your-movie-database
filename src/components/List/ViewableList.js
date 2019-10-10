import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class ViewableList extends PureComponent {

  render() {
    const { items } = this.props;

    const ViewableItem = ({ movie: { _id, title, director, year, id }, movie, idx }) => (
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
                pathname: `/movies/${title.concat('-', year).split(' ').join('-')}`,
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

    const TopMovieList = () => {
      return this.props.topMoviesList.slice(0, 20).map(
        (item, idx) => <ViewableItem movie={item} idx={idx} key={item._id}/>
      );
    };

    const UserList = () => {
      return items.map((item, idx) => <ViewableItem movie={item} idx={idx} key={item._id}/>)
    };

    const whatToShow = () => {
      if (this.props.match.path === '/') {
        return <TopMovieList />
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

const mapStateToProps = state => ({
  topMoviesList: state.topMoviesList,
});

export default withRouter(connect(mapStateToProps)(ViewableList));