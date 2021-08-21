import React, { Component, Fragment } from 'react'
import {
  Form,
  FormGroup,
  Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { searchAlbums, searchArtists } from '../actions/searchActions';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,

      query: '',
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    this.props.searchArtists(JSON.stringify({ query }));

    this.setState({ query: '' });
  }

  render() {
    return (
      <Fragment>
        <Form onSubmit={this.onSubmit} className="form-inline ml-2">
          <FormGroup>
            <Input
              type="text"
              id="query"
              name="query"
              placeholder="Search"
              value={this.state.query}
              onChange={this.onChange}
            />
          </FormGroup>
        </Form>
      </Fragment>
    );
  }
}

export default connect(null, { searchAlbums, searchArtists })(SearchForm);
