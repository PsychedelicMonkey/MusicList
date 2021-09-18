import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';

import AppNavbar from './components/AppNavbar';
import Album from './components/Album';
import Artist from './components/Artist';
import Results from './components/Results';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      setAuthToken(token);
    }

    this.props.loadUser();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <AppNavbar />
          <Route exact path="/" component={Results} />
          <Route exact path="/albums/:id" component={Album} />
          <Route exact path="/artists/:id" component={Artist} />
          <Route exact path="/auth/login" component={Login} />
          <Route exact path="/auth/signup" component={SignUp} />
        </Router>
      </div>
    );
  }
}

export default connect(null, { loadUser })(App);
