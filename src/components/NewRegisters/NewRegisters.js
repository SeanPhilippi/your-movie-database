import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {Form, Row} from 'react-bootstrap/Form';

import './NewRegisters.css';
import { userInfo } from 'os';

class NewRegisters extends PureComponent {

  state = {
    users: [
      {
        name: 'Sean Philippi',
        register_date: 'Jun 21, 2019'
      }
    ]
  }

  render() {
    return (
      <Row className="login-box bg-white d-flex flex-column mt-2">
        <div className="login-title bg-red text-white m-0 p-2 pl-4">SPOTLIGHT ON A USER</div>
        <div className="py-2 px-4 bg-white">
          <div className="mb-2">
            Most recently registered users on YMDb:
          </div>
          <div className="text-orange">
            {
              this.state.users.map(user => {
                return (
                  <div className="d-flex justify-content-between">
                    <div>{user.name}</div>
                    <div>{user.register_date}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </Row>
    )
  }
}

NewRegisters.propTypes = {

}

export default NewRegisters;
