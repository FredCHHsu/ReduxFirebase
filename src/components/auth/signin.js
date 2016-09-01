import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
  }
  onSubmit({ email, password }) {
    // console.log(`${email}, ${password}`);
    this.props.signinUser({ email, password });
  }
  renderAlert() {
    return this.props.errorMessage ? (
      <div className="alert alert-danger">
        <strong>Oops!</strong> {this.props.errorMessage}
      </div>
    ) : null;
  }
  render() {
    const { handleSubmit, fields: { email, password } } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className="form-group">
          <label>email</label>
          <input {...email} className="form-control" />
        </div>
        <div className="form-group">
          <label>password</label>
          <input {...password} type="password" className="form-control" />
        </div>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

Signin.propTypes = {
  signinUser: PropTypes.func,
  handleSubmit: PropTypes.func,
  fields: PropTypes.object,
  errorMessage: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
  };
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password'],
}, mapStateToProps, actions)(Signin);
