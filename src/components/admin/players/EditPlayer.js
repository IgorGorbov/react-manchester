import React, { Component } from 'react';
import AdminLayout from '../../../hoc/AdminLayout';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';
import FileUpLoader from '../../ui/fileUpLoader';

import { firebase, fireBaseDB, firebasePlayers } from '../../../firebase';

import { match, history } from '../../../customPropTypes';

class EditPlayer extends Component {
  static propTypes = {
    match: match.isRequired,
    history: history.isRequired,
  };

  state = {
    playerId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    defaultImg: '',
    players: [],
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Player Name',
          name: 'name_input',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          label: 'Player Last Name',
          name: 'lastname_input',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      number: {
        element: 'input',
        value: '',
        config: {
          label: 'Player Number',
          name: 'number_input',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      position: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a position',
          name: 'select_position',
          type: 'text',
          options: [
            { key: 'Keeper', value: 'Keeper' },
            { key: 'Defence', value: 'Defence' },
            { key: 'Midfield', value: 'Midfield' },
            { key: 'Striker', value: 'Striker' },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      image: {
        element: 'image',
        value: '',
        validation: {
          required: true,
        },
        valid: true,
      },
    },
  };

  componentDidMount() {
    const { match } = this.props;
    const playerId = match.params.id;

    if (!playerId) {
      this.setState({
        formType: 'Add player',
      });
    } else {
      fireBaseDB
        .ref(`players/${playerId}`)
        .once('value')
        .then(snapshot => {
          const playerData = snapshot.val();

          firebase
            .storage()
            .ref('players')
            .child(playerData.image)
            .getDownloadURL()
            .then(url => {
              this.updateFields(playerData, playerId, 'Edit player', url);
            })
            .catch(e => {
              this.updateFields(
                { ...playerData, image: '' },
                playerId,
                'Edit player',
                ''
              );
            });
        });
    }
  }

  updateFields = (player, playerId, formType, defaultImg) => {
    const newFormData = { ...this.state.formData };
    for (const key in newFormData) {
      newFormData[key].value = player[key];
      newFormData[key].valid = true;
    }

    this.setState({
      playerId,
      defaultImg,
      formType,
      formData: newFormData,
    });
  };

  submitForm = event => {
    event.preventDefault();
    const { formData, formType, playerId } = this.state;
    const dataToSubmit = {};
    let formIsValid = true;

    Object.keys(formData).forEach(key => {
      dataToSubmit[key] = formData[key].value;
      formIsValid = formData[key].valid && formIsValid;
    });

    if (formIsValid) {
      if (formType === 'Edit player') {
        fireBaseDB
          .ref(`/players/${playerId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm('Update correctly');
          })
          .catch(e => {
            this.setState({
              formError: true,
            });
          });
      } else {
        firebasePlayers
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push('/admin-players');
          })
          .catch(e => {
            this.setState({
              formError: true,
            });
          });
      }
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  storeFilename = fileName => {
    this.updateForm({ id: 'image' }, fileName);
  };

  resetImage = () => {
    const newFormData = { ...this.state.formData };

    newFormData.image.value = '';
    newFormData.image.valid = false;
    this.setState({
      defaultImg: '',
      formData: newFormData,
    });
  };

  updateForm = (element, content = '') => {
    const { formData } = this.state;
    const newFormData = { ...formData };
    const newElement = { ...newFormData[element.id] };

    if (content === '') {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }

    const validDate = validate(newElement);

    newFormData[element.id] = newElement;
    newElement.valid = validDate[0];
    newElement.validationMessage = validDate[1];

    this.setState({
      formError: false,
      formData: newFormData,
    });
  };

  successForm = message => {
    this.setState({
      formSuccess: message,
    });

    setTimeout(
      () =>
        this.setState({
          formSuccess: '',
        }),
      2000
    );
  };

  render() {
    const {
      formType,
      formData,
      formError,
      formSuccess,
      defaultImg,
    } = this.state;
    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
          <h2>{formType}</h2>
          <div>
            <form onSubmit={event => this.submitForm(event)}>
              <FileUpLoader
                dir="players"
                tag="Player image"
                defaultImg={defaultImg}
                defaultImgName={formData.image.value}
                resetImage={() => this.resetImage()}
                filename={filename => this.storeFilename(filename)}
              />
              <FormField
                id="name"
                formData={formData.name}
                change={element => this.updateForm(element)}
              />
              <FormField
                id="lastname"
                formData={formData.lastname}
                change={element => this.updateForm(element)}
              />
              <FormField
                id="number"
                formData={formData.number}
                change={element => this.updateForm(element)}
              />
              <FormField
                id="position"
                formData={formData.position}
                change={element => this.updateForm(element)}
              />

              <div className="success_label">{formSuccess}</div>

              {formError ? (
                <div className="error_label">Something is wrong</div>
              ) : null}

              <div className="admin_submit">
                <button type="submit" onClick={event => this.submitForm(event)}>
                  {formType}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default EditPlayer;
