import React, { Component } from 'react';
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
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

    alert(JSON.stringify(this.state));
  }

  render() {
    return (
      <Container>
        <main>
          <div className="my-3 px-4">
            <h1 className="text-center">Log In</h1>

            <Form onSubmit={this.onSubmit}>
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

              <Button type="submit" color="primary" block className="mt-4">Log In</Button>
            </Form>

            <hr></hr>
            <Link className="btn btn-secondary btn-block my-3" to="/auth/signup">Sign Up</Link>
          </div>
        </main>
      </Container>
    );
  }
}

export default Login;
