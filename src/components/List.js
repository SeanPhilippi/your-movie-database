import React from 'react';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

class List extends React.Component {

  liStyle = {
    fontSize: '15px',
    border: 'black solid 1px',
    margin: 'auto',
    paddingTop: '2px',
    paddingBottom: '2px',
    marginTop: '10px',
    marginBottom: '10px',
    display: 'block',
    width: '42%'
  }

  render() {

    console.log('list', this.props.list)

    return (
      <div>
        {this.props.list.map(movie => (
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

const mapDispatchToProps = (dispatch, props) => ({
  orderList: ({ oldIndex, newIndex }) => {
    dispatch(listActions.orderList(oldIndex, newIndex))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(List);