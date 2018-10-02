import React, { Component } from 'react';
import FormField from '../ui/formFields';
import { validate } from '../ui/misc';
import { firebase } from '../../firebase';

import { history } from '../../customPropTypes';

class SignIn extends Component {
  static propTypes = {
    history: history.isRequired,
  };

  state = {
    formError: false,
    formSuccess: '',
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email',
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        validationMessage: '',
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
      },
    },
  };

  submitForm(event) {
    event.preventDefault();
    const { formData } = this.state;
    const dataToSubmit = {};
    let formIsValid = true;

    Object.keys(formData).forEach(key => {
      dataToSubmit[key] = formData[key].value;
      formIsValid = formData[key].valid && formIsValid;
    });

    if (formIsValid) {
      firebase
        .auth()
        .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
        .then(() => {
          this.props.history.push('/dashboard');
        })
        .catch(error => {
          this.setState({
            formError: true,
          });
        });
    } else {
      this.setState({
        formError: true,
      });
    }
  }

  updateForm(element) {
    const { formData } = this.state;
    const newFormData = { ...formData };
    const newElement = { ...newFormData[element.id] };

    newElement.value = element.event.target.value;

    const validDate = validate(newElement);

    newFormData[element.id] = newElement;
    newElement.valid = validDate[0];
    newElement.validationMessage = validDate[1];

    this.setState({
      formError: false,
      formData: newFormData,
    });
  }

  render() {
    const { formData, formError } = this.state;
    return (
      <div className="container">
        {' '}
        <div className="signin_wrapper" style={{ margin: '100px' }}>
          <form onScroll={event => this.submitForm(event)}>
            <h2>Please Login</h2>

            <FormField
              id="email"
              formData={formData.email}
              change={element => this.updateForm(element)}
            />
            <FormField
              id="password"
              formData={formData.password}
              change={element => this.updateForm(element)}
            />
            {formError ? (
              <div className="error_label">Something is wrong, try again</div>
            ) : null}

            <button type="submit" onClick={event => this.submitForm(event)}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
