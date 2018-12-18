import React from 'react';
import classnames from 'classnames';
import DraggableList from 'react-draggable-list'
// import ListItem from './ListItem'; 
// building class component within this file for ease of access

const cx = classnames;

type Item = {
  name: string;
  subtitle?: boolean;
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

  getDragHeight() {
    return this.props.item.subtitle ? 47 : 28;
  }

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
        {item.subtitle &&
          <div className="subtitle">{item.director}, {item.year}</div>
        }
        <div>
          background image
          {/* {year}<br />
          {director}<br />
          {country} */}
        </div>
      </div>
    )
  }
}

type ExampleState = {
  useContainer: boolean;
  list: $ReadOnlyArray<Item>;
}

export default class List extends React.Component<{}, ExampleState> {
  _container: HTMLElement;

  state = {
    useContainer: false,
    list: this.props.list
  };


  _onListChange(newList: $ReadOnlyArray<Item>) {
    this.setState({ list: newList });
  }

  render() {
    const { useContainer } = this.state;

    return (

      <div className="main" >
        <div
          className="list" ref={el => {
            if (el) this._container = el;
          }}
          style={{
            overflow: useContainer ? 'auto' : '',
            height: useContainer ? '200px' : '',
            border: useContainer ? '1px solid gray' : ''
          }}
        >

          <DraggableList
            itemKey="name"
            list={this.props.list}
            template={ListItem}
            onMoveEnd={newList => this._onListChange(newList)}
            container={() => useContainer ? this._container : document.body}
          />
        </div>
      </div>
    )
  }
};