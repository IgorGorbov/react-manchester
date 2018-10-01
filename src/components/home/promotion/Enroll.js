import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import FormFields from '../../ui/formFields';
import { validate } from '../../ui/misc';

import { firebasePromotion } from '../../../firebase';

class Enroll extends Component {
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
      firebasePromotion
        .orderByChild('email')
        .equalTo(dataToSubmit.email)
        .once('value')
        .then(snapshot => {
          if (snapshot.val() === null) {
            firebasePromotion.push(dataToSubmit);
            this.resetFormSuccess(true);
          } else {
            this.resetFormSuccess(false);
          }
        });
    } else {
      this.setState({
        formError: true,
      });
    }
  }

  resetFormSuccess(type) {
    const { formData } = this.state;
    const newFormData = { ...formData };

    for (const key in newFormData) {
      newFormData[key].value = '';
      newFormData[key].valid = false;
      newFormData[key].validationMessage = '';
    }

    this.setState({
      formError: false,
      formData: newFormData,
      formSuccess: type ? 'Congratulation' : 'Already on the database',
    });

    this.successMessage();
  }

  successMessage() {
    setTimeout(() => {
      this.setState({
        formSuccess: '',
      });
    }, 2000);
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
    const { formData, formError, formSuccess } = this.state;
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={event => this.submitForm(event)}>
            <div className="enroll_title">Enter your email</div>
            <div className="enroll_input">
              <FormFields
                id="email"
                formData={formData.email}
                change={element => this.updateForm(element)}
              />
              {formError ? (
                <div className="error_label">Something is wrong, try again</div>
              ) : null}
              <div className="success_label">{formSuccess}</div>
              <button type="submit" onClick={event => this.submitForm(event)}>
                Enroll
              </button>
              <div className="enroll_discl">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Deserunt, ut
              </div>
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;
