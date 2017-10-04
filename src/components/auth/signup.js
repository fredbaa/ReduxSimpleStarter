import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(values) {
    this.props.signupUser(values);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Ooops! </strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password, confirmPassword }} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control" />
          { email.touched && email.error && <div className="error">{email.error}</div> }
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input type="password" {...password} className="form-control" />
          { password.touched && password.error && <div className="error">{password.error}</div> }
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input type="password" {...confirmPassword} className="form-control" />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (values.password !== values.confirmPassword ) {
    errors.password = "Passwords must match";
  }

  if (!values.email) {
    errors.email = "Email must not be blank";
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'confirmPassword'],
  validate
}, mapStateToProps, actions)(Signup);
