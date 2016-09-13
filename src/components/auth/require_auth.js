import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/index';

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      const isAuthrized = this.props.currentUser;
      if (!isAuthrized) {
        this.context.router.push('/');
      } else {
        // this.props.fetchUser(this.props.currentUser.uid);
      }
    }

    componentWillUpdate(nextProps) {
      const isAuthrized = nextProps.currentUser;
      if (!isAuthrized) {
        this.context.router.push('/');
      } else {
        // const canEdit = nextProps.user.posts.hasOwnProperty(this.props.params.id);
        // if (!canEdit) {
        //   this.context.router.push('/');
        // }
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      currentUser: state.auth.currentUser,
      user: state.users.user,
    };
  }

  Authentication.propTypes = {
    currentUser: PropTypes.object,
    fetchUser: PropTypes.func,
    user: PropTypes.object,
    params: PropTypes.object,
  };

  Authentication.contextTypes = {
    router: PropTypes.object,
  };

  return connect(mapStateToProps, { fetchUser })(Authentication);
}
