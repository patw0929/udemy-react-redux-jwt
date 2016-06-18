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
          <fieldset className={`form-group ${email.touched && email.invalid ? 'has-danger' : ''}`}>
            <label>E-mail</label>
            <input {...email} type="email" className="form-control" />
            <div className="error">
              {email.touched ? email.error : ''}
            </div>
          </fieldset>
          <fieldset className={`form-group ${password.touched && password.invalid ? 'has-danger' : ''}`}>
            <label>Password</label>
            <input {...password} type="password" className="form-control" />
            <div className="error">
              {password.touched ? password.error : ''}
            </div>
          </fieldset>
          <fieldset className={`form-group ${passwordConfirm.touched && passwordConfirm.invalid ? 'has-danger' : ''}`}>
            <label>Confirm Password</label>
            <input {...passwordConfirm} type="password" className="form-control" />
            <div className="error">
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
  } else {
    const regexpEmail = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
    if (!regexpEmail.test(values.email)) {
      errors.email = 'Wrong E-mail format';
    }
  }

  if (!values.password) {
    errors.password = 'Enter the Password';
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Enter the Confirm Password';
  }

  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = 'Password must match';
  }

  return errors;
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate,
})(Signup);
