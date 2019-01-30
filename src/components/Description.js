import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  setDescript, 
  fetchList
} from '../redux/actions';

class Description extends Component {

    componentWillMount = () => {
    this.props.fetchList();
  }

  render() {

    return (
      <div className="description">
        <textarea
          className="textarea"
          name="description"
          id=""
          cols="80"
          rows="20"
          placeholder="Write your description here..."
          onChange={e => this.props.setDescript(e.target.value)}
          value={this.props.listDescript}
        >
        </textarea>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  listDescript: state.listDescript
})

const mapDispatchToProps = dispatch => ({
  fetchList: list => dispatch(fetchList(list)),
  setDescript: text => dispatch(setDescript(text)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Description);