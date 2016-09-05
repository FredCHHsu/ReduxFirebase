import React, { PropTypes, Component } from 'react';
import Header from './header';
import { connect } from 'react-redux';
import { checkAuthState } from '../actions/index.js';

class App extends Component {
  componentWillMount() {
    this.props.checkAuthState();
  }
  render() {
    return (
      <div id="app">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  checkAuthState: PropTypes.func,
};

export default connect(null, { checkAuthState })(App);
