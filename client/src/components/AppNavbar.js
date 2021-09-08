import React, { Component } from 'react';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Logout from './auth/Logout';
import SearchForm from './SearchForm';

class AppNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { isOpen } = this.state;
    const { isAuthenticated, user } = this.props;

    return (
      <Navbar color="light" light expand="md" fixed="top">
        <Container>
          <NavbarBrand tag={Link} to="/">MusicList</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="https://github.com/PsychedelicMonkey/MusicList" target="_blank">GitHub</NavLink>
              </NavItem>
              <SearchForm />
            </Nav>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>{user.firstName} {user.lastName}</DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>My Albums</DropdownItem>
                    <DropdownItem>My Artists</DropdownItem>
                    <DropdownItem>My Profile</DropdownItem>
                    <DropdownItem divider />
                    <Logout />
                  </DropdownMenu>
                </UncontrolledDropdown>
              ): (
                <NavItem>
                  <NavLink tag={Link} to="/auth/login">Log In</NavLink>
                </NavItem>
              ) }
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(AppNavbar);
