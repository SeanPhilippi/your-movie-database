import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MovieResult = ({
  movie,
  movie: {
    imdbId,
    Title,
    Year,
  },
}) => (
  <div
    key={imdbId}
    className="result-item"
    onClick={() => this.handleAdd(movie)}
  >
    <div className="result-info">
      <div style={{ fontSize: "15px" }}>
        { Title } ({ Year })
      </div>
    </div>
  </div>
);

MovieResult.propTypes = {
  movie: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  list: state.list,
});

export default connect(mapStateToProps)(MovieResult);
