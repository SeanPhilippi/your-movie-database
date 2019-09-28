import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Rankings extends PureComponent {

  render() {
    const { title } = this.props;

    const voters = [
      {
        name: 'sally',
        rank: 10
      },
      {
        name: 'joe',
        rank: 8
      },
      {
        name: 'henry',
        rank: 3
      },
      {
        name: 'sally',
        rank: 10
      },
      {
        name: 'joe',
        rank: 8
      },
      {
        name: 'henry',
        rank: 3
      },
      {
        name: 'sally',
        rank: 10
      },
      {
        name: 'joe',
        rank: 8
      },
      {
        name: 'henry',
        rank: 3
      },
      {
        name: 'sally',
        rank: 10
      },
      {
        name: 'joe',
        rank: 8
      },
      {
        name: 'henry',
        rank: 3
      },
      {
        name: 'sally',
        rank: 10
      },
      {
        name: 'joe',
        rank: 8
      },
      {
        name: 'henry',
        rank: 3
      },
      {
        name: 'sally',
        rank: 10
      },
      {
        name: 'joe',
        rank: 8
      },
      {
        name: 'henry',
        rank: 3
      },
    ]

    return (
      <div className="">
        <div className="font-weight-bold mb-1">
          User's that ranked { title }:
        </div>
        <div className="bg-white">
          {
            voters.map(user => (
              <div className="d-flex justify-content-between">
                <div className="bd-light row-height col-10">
                  <Link to="">
                    { user.name }
                  </Link>
                </div>
                <div className="bd-light row-height col-2 text-right">
                  #{ user.rank }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

Rankings.propTypes = {
  movie: PropTypes.object.isRequired
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(Rankings);
