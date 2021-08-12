import React, { Component, Fragment } from 'react'
import {
  Alert,
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
  Spinner,
} from 'reactstrap';
import { connect } from 'react-redux';
import { clearErrors } from '../../actions/errorActions';
import { searchAlbums } from '../../actions/searchActions';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      disabled: false,
      msg: null,

      query: '',
    };

    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.closeError = this.closeError.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    const { isLoading, results } = this.props.search;

    if (prevProps !== this.props) {
      // Disable submit button while results are loading
      if (prevProps.isLoading !== isLoading) {
        if (isLoading) {
          this.setState({ disabled: true });
        } else {
          this.setState({ disabled: false });
        }
      }

      // Display error message
      if (prevProps.error !== error) {
        if (error.id === 'SEARCH_ALBUMS_ERROR') {
          this.setState({ msg: error.msg });
        } else {
          this.setState({ msg: null });
        }
      }

      // Close modal once results are loaded
      if (prevProps.results !== results) {
        if (results) {
          this.setState({ isOpen: false });
        }
      }
    }
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
  
  closeError = () => {
    this.props.clearErrors();
  }
  
  render() {
    const { disabled, msg,  isOpen } = this.state;
    const { isLoading } = this.props.search;

    return (
      <Fragment>
        <NavItem>
          <NavLink onClick={this.toggle} href="#">Search</NavLink>
        </NavItem>
        <Modal isOpen={isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Search</ModalHeader>
          <Form onSubmit={this.onSubmit}>
            <ModalBody>
              { msg ? <Alert color="danger" toggle={this.closeError}>{msg}</Alert> : null }
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
              <Button type="submit" color="primary" disabled={disabled}>
                { isLoading ? <Spinner className="mr-2" size="sm" /> : null }
                Search
              </Button>
              <Button onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
  search: state.search,
});

export default connect(mapStateToProps, { clearErrors, searchAlbums })(Search);
