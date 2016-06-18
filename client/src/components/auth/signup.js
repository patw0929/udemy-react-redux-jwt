import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  onSubmit(props) {
    console.log(props);
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm } } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <fieldset className={`form-group ${email.touched && email.invalid ? 'has-    danger' : ''}`}>
            <label>E-mail</label>
            <input {...email} type="email" className="form-control" />
            <div className="text-help">
              {email.touched ? email.error : ''}
            </div>
          </fieldset>
          <fieldset className={`form-group ${password.touched && password.invalid ? 'has-    danger' : ''}`}>
            <label>Password</label>
            <input {...password} type="password" className="form-control" />
            <div className="text-help">
              {password.touched ? password.error : ''}
            </div>
          </fieldset>
          <fieldset className={`form-group ${passwordConfirm.touched && passwordConfirm.invalid ? 'has-    danger' : ''}`}>
            <label>Confirm Password</label>
            <input {...passwordConfirm} type="password" className="form-control" />
            <div className="text-help">
              {passwordConfirm.touched ? passwordConfirm.error : ''}
            </div>
          </fieldset>

          <button type="submit" className="btn btn-primary">Sign up</button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = 'Enter the E-mail';
  }

  if (!values.password) {
    errors.password = 'Enter the Password';
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Enter the Confirm Password';
  }

  return errors;
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate,
})(Signup);
