import React from 'react';
import { connect } from 'react-redux';

class List extends React.Component {

  liStyle = {
    fontSize: 15,
    display: 'block',
    paddingLeft: 16,
    margin: 'auto',
    marginTop: 20,
    width: '42%'
  }

  render() {

    console.log('list', this.props.list)

    return (
      <div>
        {this.props.list.map((movie) => (
          <div key={movie.id} style={this.liStyle}>
            <span style={{ fontSize: "20px" }}>{movie.name}</span>
            <br />
            {movie.director}, {movie.year}
          </div>
        ))}
      </div>
    )
  }
}

// mapping Redux global state to props
const mapStateToProps = state => ({
  list: state.list
});

export default connect(mapStateToProps)(List);