import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <Link to="/signin">Sign in</Link>
          </li>
        </ul>
      </nav>
    );
  }
}
