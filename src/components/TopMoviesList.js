import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ViewableList from './List/ViewableList/ViewableList';
import CardWrapper from './HOCs/CardWrapper';
import withLoading from './HOCs/withLoading';
import Comments from './Comments';
import { fetchTopMoviesComments } from '../redux/actions';

const CommentsWithLoading = withLoading(Comments);

class TopMoviesList extends PureComponent {

  componentDidMount() {
    const { fetchTopMoviesComments } = this.props;
    fetchTopMoviesComments();
  };

  render() {
    const {
      commentsLoading,
      comments
    } = this.props;
    return (
      <div className='grid-container bg-light2 vw-95 w-md-100 mx-auto'>
        <div className='bg-white'>
          <div className='px-4 pt-4 w-100'>
            <CardWrapper
              icon={['far', 'list-alt']}
              rotate={ -5 }
              title={ 'top movies list' }
              color='tan'
              marginTopVal='0'
            >
              <ViewableList itemsPerPage={ 25 } />
            </CardWrapper>
          </div>
        </div>
        <div className='m-4'>
          <CardWrapper
            icon='comments'
            title='comments'
            color='white'
            marginTopVal='0'
          >
            <CommentsWithLoading
              isLoading={ commentsLoading }
              comments={ comments }
            />
          </CardWrapper>
        </div>
      </div>
    );
  };
};

const mapDispatchToProps = dispatch => ({
  fetchTopMoviesComments: () => dispatch(fetchTopMoviesComments()),
});

const mapStateToProps = state => ({
  commentsLoading: state.commentsLoading,
  comments: state.comments,
});

TopMoviesList.propTypes = {
  commentsLoading: PropTypes.bool.isRequired,
  comments: PropTypes.array.isRequired,
  fetchTopMoviesComments: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopMoviesList);