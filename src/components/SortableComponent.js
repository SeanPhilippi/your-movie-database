import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { orderList, deleteMovie } from '../redux/actions';


class SortableComponent extends Component {

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
  };

  buttonStyle = {
    fontSize: '20px',
    // border: 'black solid 2px',
    float: 'right',
    marginRight: '5px',
    padding: '0 7px 3px 7px'
  }

  numStyle = {
    fontSize: '22px',
    float: 'left',
    marginLeft: '10px'
  }

  // save a list
  handleSave = () => {
    fetch('/:user/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.props.list)
    })
      .then(res => res.json())
      .catch(err => console.log(err))
  }

  // update a list
  handleChange = () => {
    fetch('/:user/:listId/update', {
      method: 'PUT',
      // to be continued
    })
      .then(res => res.json())
      .catch(err => console.log(err))
  }

  render() {
    console.log('props', this.props)
    const { list, orderList, deleteMovie } = this.props;

    const SortableItem = SortableElement(({ movie, sortIndex }) => {
      return (

        <div key={movie.id} style={this.liStyle} >
          <span>
            <span style={this.numStyle}>{sortIndex + 1} |</span>
            <span style={{ fontSize: "20px" }}>{movie.name}</span>
          </span>
          {/* delete button */}
          <button onClick={() => deleteMovie(movie)} style={this.buttonStyle}>x</button>
          <br />
          {movie.director}, {movie.year}
        </div>
      )
    }
    )

    const SortableList = SortableContainer(({ items }) => {
      // debugger;
      return (
        <ul className="row" >
          {
            items.map((movie, index) => {
              console.log('movie1', movie);
              return <SortableItem key={`item-${movie.id}`} sortIndex={index} index={index} movie={movie} />
            })
          }
        </ul>
      )
    })

    return <SortableList items={list} onSortEnd={orderList} axis="y" />;
  }
}

const mapStateToProps = state => ({
  list: state.list
});

const mapDispatchToProps = dispatch => ({
  orderList: ({ oldIndex, newIndex }) => dispatch(orderList(oldIndex, newIndex)),
  deleteMovie: (movie) => dispatch(deleteMovie(movie))
});

export default connect(mapStateToProps, mapDispatchToProps)(SortableComponent);