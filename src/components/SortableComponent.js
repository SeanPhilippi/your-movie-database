import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { orderList } from '../redux/actions';

const SortableItem = SortableElement(({ value }) =>
  <li className="col-6 col-md-4 col-lg-3 mt-3 px-2">
    <img className="image-item" src={value.imgUrl} />
  </li>
)

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul className="row" >
      {
        items.map((value, index) => (
          <SortableItem key={`item-${value.id}`} index={index} value={value} />
        ))
      }
    </ul>
  )
})

class SortableComponent extends Component {
  render() {
    return <SortableList items={this.props.data} onSortEnd={this.props.onSortEnd} axis="xy" />;
  }
}

const mapStateToProps = state => ({
  list: state.list
});

const mapDispatchToProps = dispatch => ({
  orderList: (oldIndex, newIndex) => dispatch(orderList(oldIndex, newIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(SortableComponent);