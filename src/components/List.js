import React from 'react';
import classnames from 'classnames';  //install npm i classnames?
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
          <div className="subtitle">This item has a subtitle visible while dragging</div>
        }
        <div>
          year<br />
          director<br />
          country
          {/* {year}<br />
          {director}<br />
          {country} */}
        </div>
        <div>
          year<br />
          director<br />
          country
          {/* {year}<br />
          {director}<br />
          {country} */}
        </div>
        <div>
          State works and is retained during movement:
          {' '}<input type="button" value={value} onClick={() => this._inc()} />
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
    list: [
      { name: 'Mercury' },
      { name: 'Venus' },
      { name: 'Earth', subtitle: true },
      { name: 'Mars' },
      { name: 'Jupiter' },
      { name: 'Saturn', subtitle: true },
      { name: 'Uranus', subtitle: true },
      { name: 'Neptune' }
    ]
  };
  // state = {
  //   list: [
  //     {
  //       id: 1,
  //       title: 'movie1',
  //       year: 1999,
  //       director: 'Stanley Kubrick'
  //     },
  //     {
  //       id: 2,
  //       title: 'movie1',
  //       year: 1969,
  //       director: 'Luis Bunuel'
  //     },
  //     {
  //       id: 3,
  //       title: 'movie1',
  //       year: 1982,
  //       director: 'David Lynch'
  //     },
  //   ]
  // }

  _togglePluto() {
    const noPluto = this.state.list.filter(item => item.name !== 'Pluto');
    if (noPluto.length !== this.state.list.length) {
      this.setState({ list: noPluto });
    } else {
      this.setState({ list: this.state.list.concat([{ name: 'Pluto' }]) });
    }
  }

  _toggleContainer() {
    this.setState({ useContainer: !this.state.useContainer });
  }

  _onListChange(newList: $ReadOnlyArray<Item>) {
    this.setState({ list: newList });
  }

  render() {
    const { useContainer } = this.state;

    return (

      <div className="main">
        <div className="intro">
          <p>
            This is a demonstration of the <a href="https://github.com/StreakYC/react-draggable-list">react-draggable-list</a> library.
        </p>
          <p>
            Each item has a drag handle visible when the user hovers over them.
            The items may have any height, and can each define their own height
            to use while being dragged.
        </p>
          <p>
            When the list is reordered, the page will
            be scrolled if possible to keep the moved item visible and on the
            same part of the screen.
        </p>
          <div>
            <input type="button" value="Toggle Pluto" onClick={() => this._togglePluto()} />
            <input type="button" value="Toggle Container" onClick={() => this._toggleContainer()} />
          </div>
        </div>
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
            list={this.state.list}
            template={ListItem}
            onMoveEnd={newList => this._onListChange(newList)}
            container={() => useContainer ? this._container : document.body}
          />
        </div>
      </div>
    )
  }
};