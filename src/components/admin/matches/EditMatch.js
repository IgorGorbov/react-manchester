import React, { Component } from 'react';
import AdminLayout from '../../../hoc/AdminLayout';
import FormField from '../../ui/formFields';
import { validate, fireBaseLooper } from '../../ui/misc';
import {
  firebase,
  fireBaseDB,
  firebaseMatches,
  firebaseTeams,
} from '../../../firebase';

import { match, history } from '../../../customPropTypes';

class EditMatch extends Component {
  state = {
    matchId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    teams: [],
    formData: {
      date: {
        element: 'input',
        value: '',
        config: {
          label: 'Event date',
          name: 'date_input',
          type: 'date',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      local: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a local team',
          name: 'select_local',
          type: 'select',
          options: [{ key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: false,
      },
      resultLocal: {
        element: 'input',
        value: '',
        config: {
          label: 'Result local',
          name: 'result_local_input',
          type: 'text',
          placeholder: 'score',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: false,
      },
      away: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a local team',
          name: 'select_local',
          type: 'select',
          options: [{ key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: false,
      },
      resultAway: {
        element: 'input',
        value: '',
        config: {
          label: 'Result away local',
          name: 'result_away_input',
          type: 'text',
          placeholder: 'score',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: false,
      },
      referee: {
        element: 'input',
        value: '',
        config: {
          label: 'Referee',
          name: 'referee_input',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      stadium: {
        element: 'input',
        value: '',
        config: {
          label: 'Stadium',
          name: 'stadium_input',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      result: {
        element: 'select',
        value: '',
        config: {
          label: 'Team result',
          name: 'select_result',
          type: 'select',
          options: [
            { key: 'W', value: 'W' },
            { key: 'L', value: 'L' },
            { key: 'D', value: 'D' },
            { key: 'n/a', value: 'n/a' },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      final: {
        element: 'select',
        value: '',
        config: {
          label: 'Game played',
          name: 'select_played',
          type: 'select',
          options: [{ key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
    },
  };

  static propTypes = {
    match: match.isRequired,
    history: history.isRequired,
  };

  componentDidMount() {
    const matchId = this.props.match.params.id;
    const getTeams = (match, type) => {
      firebaseTeams.once('value').then(snapshot => {
        const teams = fireBaseLooper(snapshot);

        const teamOptions = [];
        snapshot.forEach(childSnapshot => {
          teamOptions.push({
            key: childSnapshot.val().shortName,
            value: childSnapshot.val().shortName,
          });

          this.updateField(match, teamOptions, teams, type, matchId);
        });
      });
    };

    if (!matchId) {
      getTeams(false, 'Add Match');
    } else {
      fireBaseDB
        .ref(`matches/${matchId}`)
        .once('value')
        .then(snapshot => {
          const match = snapshot.val();
          getTeams(match, 'Edit Match');
        });
    }
  }

  updateField(match, teamOptions, teams, type, matchId) {
    const newFormData = {
      ...this.state.formData,
    };

    for (const key in newFormData) {
      if (match) {
        newFormData[key].value = match[key];
        newFormData[key].valid = true;
      }
      if (key === 'local' || key === 'away') {
        newFormData[key].config.options = teamOptions;
      }
    }

    this.setState({
      matchId,
      formType: type,
      formData: newFormData,
      teams,
    });
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

  successForm(message) {
    this.setState({
      formSuccess: message,
    });

    setTimeout(() => {
      this.setState({
        formSuccess: '',
      });
    }, 2000);
  }

  submitForm(event) {
    event.preventDefault();
    const { formData, teams, formType, matchId } = this.state;
    const dataToSubmit = {};
    let formIsValid = true;

    Object.keys(formData).forEach(key => {
      dataToSubmit[key] = formData[key].value;
      formIsValid = formData[key].valid && formIsValid;
    });

    teams.forEach(team => {
      if (team.shortName === dataToSubmit.local) {
        dataToSubmit.localThmb = team.thmb;
      }
      if (team.shortName === dataToSubmit.away) {
        dataToSubmit.awayThmb = team.thmb;
      }
    });

    if (formIsValid) {
      if (formType === 'Edit Match') {
        fireBaseDB
          .ref(`matches/${matchId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm('Updated correctly');
          })
          .catch(e => {
            this.setState({
              formError: true,
            });
          });
      } else {
        firebaseMatches
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push('/admin-matches');
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
  }

  render() {
    const { formData, formType, formSuccess, formError } = this.state;
    return (
      <AdminLayout>
        <div className="editmatch_dialog_wrapper">
          <h2>{formType}</h2>
          <div>
            <form onSubmit={event => this.submitForm(event)}>
              <FormField
                id="date"
                formData={formData.date}
                change={element => this.updateForm(element)}
              />
              <div className="select_team_layout">
                <div className="label_inputs">Local</div>
                <div className="wrapper">
                  <div className="left">
                    <FormField
                      id="local"
                      formData={formData.local}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div>
                    <FormField
                      id="resultLocal"
                      formData={formData.resultLocal}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
              </div>

              <div className="select_team_layout">
                <div className="label_inputs">Away</div>
                <div className="wrapper">
                  <div className="left">
                    <FormField
                      id="away"
                      formData={formData.away}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div>
                    <FormField
                      id="resultAway"
                      formData={formData.resultAway}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
              </div>

              <div className="split_fields">
                <FormField
                  id="referee"
                  formData={formData.referee}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id="stadium"
                  formData={formData.stadium}
                  change={element => this.updateForm(element)}
                />
              </div>

              <div className="split_fields">
                <FormField
                  id="result"
                  formData={formData.result}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id="final"
                  formData={formData.final}
                  change={element => this.updateForm(element)}
                />
              </div>

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

export default EditMatch;
