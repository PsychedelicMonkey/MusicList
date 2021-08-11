import React, { Component, Fragment } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  NavItem,
  NavLink,
} from 'reactstrap';
import { connect } from 'react-redux';
import { searchAlbums } from '../../actions/searchActions';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,

      query: '',
    };

    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      query: '',
    });
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit = e => {
    e.preventDefault();

    const { query } = this.state;
    this.props.searchAlbums(JSON.stringify({ query }));
  }
  
  render() {
    const { isOpen } = this.state;

    return (
      <Fragment>
        <NavItem>
          <NavLink onClick={this.toggle} href="#">Search</NavLink>
        </NavItem>
        <Modal isOpen={isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Search</ModalHeader>
          <Form onSubmit={this.onSubmit}>
            <ModalBody>
              <FormGroup>
                <Label for="query">Search</Label>
                <Input
                  type="text"
                  id="query"
                  name="query"
                  placeholder="Songs for the Deaf"
                  value={this.state.query}
                  onChange={this.onChange}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary">Search</Button>
              <Button onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

export default connect(null, { searchAlbums })(Search);
