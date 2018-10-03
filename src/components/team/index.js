import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
// import Promise from 'core-js/es6/promise';

import PlayerCard from '../ui/playerCard';
import Stripes from '../../resources/images/stripes.png';
import { fireBaseLooper } from '../ui/misc';
import { firebasePlayers, firebase } from '../../firebase';

class TheTeam extends Component {
  state = {
    loading: true,
    players: [],
  };

  componentDidMount() {
    firebasePlayers.once('value').then(snapshot => {
      const players = fireBaseLooper(snapshot);
      const promises = [];

      for (const key in players) {
        promises.push(
          new Promise((resolve, reject) => {
            firebase
              .storage()
              .ref('players')
              .child(players[key].image)
              .getDownloadURL()
              .then(url => {
                players[key].url = url;
                resolve();
              });
          })
        );
      }

      Promise.all(promises).then(() => {
        this.setState({
          loading: false,
          players,
        });
      });
    });
  }

  showPlayersByCategory = category => {
    const { players } = this.state;
    return players
      ? players.map(
          (player, i) =>
            player.position === category ? (
              <Fade left delay={i * 20} key={player.id}>
                <div className="item">
                  <PlayerCard
                    number={player.number}
                    name={player.name}
                    lastName={player.lastname}
                    background={player.url}
                  />
                </div>
              </Fade>
            ) : null
        )
      : null;
  };

  render() {
    const { loading } = this.state;
    return (
      <div
        className="the_team_container"
        style={{
          background: `url(${Stripes}) repeat`,
        }}
      >
        {!loading ? (
          <div>
            <div className="team_category_wrapper">
              <div className="title">Keepers</div>
              <div className="team_cards">
                {this.showPlayersByCategory('Keeper')}
              </div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Defence</div>
              <div className="team_cards">
                {this.showPlayersByCategory('Defence')}
              </div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Midfield</div>
              <div className="team_cards">
                {this.showPlayersByCategory('Midfield')}
              </div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Strikers</div>
              <div className="team_cards">
                {this.showPlayersByCategory('Striker')}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default TheTeam;
