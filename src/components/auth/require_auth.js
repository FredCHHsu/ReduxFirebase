import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (!this.props.currentUser) {
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.currentUser) {
        this.context.router.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { currentUser: state.auth.currentUser };
  }

  Authentication.propTypes = {
    currentUser: PropTypes.object,
  };

  Authentication.contextTypes = {
    router: PropTypes.object,
  };

  return connect(mapStateToProps)(Authentication);
}
