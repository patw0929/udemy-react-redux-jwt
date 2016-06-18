import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  renderLinks() {
    if (this.props.authenticated) {
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/signout">Sign out</Link>
        </li>
      );
    }

    return [
      <li key={'nav-signin'} className="nav-item">
        <Link className="nav-link" to="/signin">Sign in</Link>
      </li>,
      <li key={'nav-signup'} className="nav-item">
        <Link className="nav-link" to="/signup">Sign up</Link>
      </li>
    ];
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">React Redux JWT Practice App</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps)(Header);
