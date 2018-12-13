import React from 'react';
import cx from 'classnames';  //install npm i classnames?
import DraggableList from 'react-draggable-list'
// import ListItem from './ListItem'; 
// building class component within this file for ease of access

type Item = {
  name: string;
};

type ListProps = {
  item: Item;
  itemSelected: number;
  dragHandleProps: Object;
};

type ListState = {
  value: number;
};

class ListItem extends React.Component<ListProps, ListState> {
  state = {
    value: 0
  };

  _inc() {
    this.setState({
      value: this.state.value + 1
    });
  }
}

// may not be necessary, check example and docs later
// getDragHeight() {

// }

render() {
  const { item, itemSelected, dragHandleProps } = this.props;
  const { value } = this.state;
  const scale = itemSelected * .05 + 1;
  const shadow = itemSelected * 15 + 1;
  const dragged = itemSelected !== 0;

  return (
    <div
      className={cx('item', { dragged })}
      style={{
        transform: `scale(${scale})`,
        boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px`
      }}
    >
      <div className="dragHandle" {...dragHandleProps} />
      <h2>{item.name}</h2>
      {/* optional subtitle while dragging can go here */}
      <div>
        {year}<br />
        {director}<br />
        {country}
      </div>
      )
    }

class List extends React.Component {

        state = {
          list: [
            {
              id: 1,
              title: 'movie1',
              year: 1999,
              director: 'Stanley Kubrick'
            },
            {
              id: 2,
              title: 'movie1',
              year: 1969,
              director: 'Luis Bunuel'
            },
            {
              id: 3,
              title: 'movie1',
              year: 1982,
              director: 'David Lynch'
            },
          ]
        }

  render() {

    return (
      <DraggableList
        list={this.state.list}
        template={
          <ListItem item={this.state.list[1]}
            itemSelected={0}
            anySelected={0}
            dragHandleProps={} />
        } />
      )
    }
  }
  
export default List;