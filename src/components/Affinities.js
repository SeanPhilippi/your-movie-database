import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

class Affinities extends PureComponent {
  render() {
    return (
      <div>
        <div className="bg-white">
          {
            this.props.affinities.slice(0, 5).map(
              match => (
                <div className="d-flex justify-content-between">
                  <div className="bd-light col-10">
                    <Link to={`/profile/${ match.username }`}>{ match.username }</Link>
                  </div>
                  <div className="bd-light col-2 text-right">
                    { match.score }%
                  </div>
                </div>
              )
            )
          }
        </div>
      </div>
    )
  }
}

export default Affinities;