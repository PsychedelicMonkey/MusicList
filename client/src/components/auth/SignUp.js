import React, { Component } from 'react';
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
} from 'reactstrap';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
    };

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

    const { firstName, lastName, email, password, password2 } = this.state;
    this.props.registerUser(firstName, lastName, email, password, password2);
  }

  render() {
    const { isAuthenticated, isLoading } = this.props.auth;

    if (isLoading) {
      return <Spinner className="spinner" />;
    }

    if (isAuthenticated) {
      return <Redirect to="/" />
    }

    return (
      <Container>
        <main>
          <div className="my-3 px-4">
            <h1 className="text-center">Sign Up</h1>

            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={this.state.firstName}
                  onChange={this.onChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={this.state.lastName}
                  onChange={this.onChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="email">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="password2">Confirm Password</Label>
                <Input
                  type="password"
                  id="password2"
                  name="password2"
                  placeholder="Confirm Password"
                  value={this.state.password2}
                  onChange={this.onChange}
                />
              </FormGroup>

              <Button type="submit" color="primary" block className="mt-4">Sign Up</Button>
            </Form>
          </div>
        </main>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { registerUser })(SignUp);