import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './MoviePage.css';

const MoviePage = ({
  location: {
    state: {
      movie: {
        name,
        director,
        year,
        country,
        language,
        runtime,
        plot,
      },
    },
  },
}) => (
  <div className="MoviePage">
    <h1>
      { name }
    </h1>
    <h2>
      { director }, {year}
    </h2>
    <div>
      { year }
      <br/>
      { country }
      <br/>
      { language }
      <br/>
      { runtime }
    </div>
    <p>
      { plot }
    </p>
  </div>
);

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(MoviePage);
