import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {  } from '../../redux/actions';

class ViewableList extends Component {
  render() {
    const ViewableItem = ({ movie, idx }) => (
      <div className="d-flex">
        <div>
          { idx + 1 } |&nbsp;
        </div>
        <div className="mr-2">
          { movie.title }
        </div>
        <div>
          ({ movie.director }, { movie.year })
        </div>
      </div>
    );

    return (
      <div>
        <div>
          { this.props.items.map((item, idx) => <ViewableItem movie={item} idx={idx} key={item.imdb_id}/>) }
        </div>
      </div>
    )
  }
};

ViewableList.propTypes = {
  items: PropTypes.array,
  visitedUsername: PropTypes.string,
  visitedItems: PropTypes.array,
};

const mapStateToProps = state => ({
  // only passing in items, since this only needs items.  visitedUsername and visitedStatement will be passed into different components
  // visitedItems: state.visitedItems,
  // passing in items for when the current user wants to see their viewableList
  // items: state.items,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ViewableList);
