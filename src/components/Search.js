import React from 'react';

class Search extends React.Component {

  state = {
    results: this.props.results
  }

  inputStyle = {
    fontSize: 22,
    display: 'block',
    paddingLeft: 16,
    margin: 'auto',
    marginTop: 20,
    width: '42%'
  }

  render() {

    const onKeyUp = e => {
      if (e.key === 'Enter') {
        this.props.search();
      }
    }

    return (
      <div className="Search">
        <input
          type="text"
          placeholder="Add a film..."
          style={this.inputStyle}
          value={this.state.searchText}
          onChange={this.props.textChange}
          onKeyUp={onKeyUp}
        />
        <div>
          {this.props.results}
        </div>
      </div>
    )
  }
}

export default Search;