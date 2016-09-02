import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { checkAuthState } from '../actions/index';

class Header extends Component {
  constructor(props) {
    super(props);
    this.renderLinks = this.renderLinks.bind(this);
  }

  componentWillMount() {
    this.props.checkAuthState();
  }

  renderLinks() {
    return (
      this.props.currentUser ?
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li> :
        [
          <li className="nav-item" key={1}>
            <Link className="nav-link" to="/signin">Sign In</Link>
          </li>,
          <li className="nav-item" key={2}>
            <Link className="nav-link" to="/signup">Sign Up</Link>
          </li>,
        ]
    );
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">Redux Firebase</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

Header.propTypes = {
  currentUser: PropTypes.object,
  checkAuthState: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    currentUser: state.auth.currentUser,
  };
}

export default connect(mapStateToProps, { checkAuthState })(Header);
