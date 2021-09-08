import React, { Component, Fragment } from 'react';
import {
  DropdownItem,
} from 'reactstrap';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Logout extends Component {
  logout = () => {
    this.props.logoutUser();
  }

  render() {
    return (
      <Fragment>
        <DropdownItem onClick={this.logout.bind(this)}>Log Out</DropdownItem>
      </Fragment>
    );
  }
}

export default connect(null, { logoutUser })(Logout);
