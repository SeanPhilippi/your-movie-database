import React, { Component } from 'react';
import logoUrl from './logoUrl';

export default class Footer extends Component {
  render() {
    return (
      <footer style={{ paddingTop: "20px" }}>
        <img
          src={logoUrl}
          alt=""
          style={{ width: "130px", height: "auto" }}
        />
      </footer>
    )
  }
}
