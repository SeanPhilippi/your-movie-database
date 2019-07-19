import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MovieResult = props => {
  return (
    <div
      key={props.movie.imdbId}
      className="result-item"
      onClick={() => this.handleAdd(props.movie)}
    >
      <div className="result-info">
        <div style={{ fontSize: "15px" }}>
          {props.movie.Title} ({props.movie.Year})
        </div>
      </div>
    </div>
  )
}

MovieResult.propTypes = {
  movie: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  list: state.list,
});

export default connect(mapStateToProps)(MovieResult);