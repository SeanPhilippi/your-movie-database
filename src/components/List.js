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
    list: [
      { name: '2001: A Space Odyssey', year: '1968', director: 'Stanley Kubrick', subtitle: true },
      { name: 'Mulholland Drive', year: '2001', director: 'David Lynch', subtitle: true },
      { name: 'Pickpocket', year: '1955', director: 'Robert Bresson', subtitle: true },
      { name: 'Persona', year: '1966', director: 'Ingmar Bergman', subtitle: true },
      { name: 'Solaris', year: '1972', director: 'Andrei Tarkovsky', subtitle: true },
      { name: '2046', year: '2004', director: 'Wong Kar-Wai', subtitle: true },
      { name: 'Three Colors: Blue', year: '1993', director: 'Krzysztof Kieslowski', subtitle: true },
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

  _onListChange(newList: $ReadOnlyArray<Item>) {
    this.setState({ list: newList });
  }

  render() {
    const { useContainer } = this.state;

    return (

      <div className="main">
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