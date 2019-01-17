import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { orderList } from '../redux/actions';

const liStyle = {
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

const SortableItem = SortableElement((movie) =>
  <div key={movie.id} style={liStyle}>
    <span style={{ fontSize: "20px" }}>{movie.name}</span>
    <br />
    {movie.director}, {movie.year}
  </div>
)

const SortableList = SortableContainer(({ this.props.list }) => {
  return (
    <ul className="row" >
      {
        this.props.list.map((movie, index) => (
          <SortableItem key={`item-${movie.id}`} index={index} value={movie.Title} />
        ))
      }
    </ul>
  )
})

class SortableComponent extends Component {

  render() {
    const { list, onSortEnd } = this.props;
    return <SortableList items={list} onSortEnd={onSortEnd} axis="xy" />;
  }
}

const mapStateToProps = state => ({
  list: state.list
});

const mapDispatchToProps = dispatch => ({
  orderList: (oldIndex, newIndex) => dispatch(orderList(oldIndex, newIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(SortableComponent);