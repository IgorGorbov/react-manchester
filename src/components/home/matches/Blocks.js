import React, { Component } from 'react';
import Slide from 'react-reveal/Slide';
import { firebaseMatches } from '../../../firebase';
import { fireBaseLooper, reverseArray } from '../../ui/misc';

import MatchesBlock from '../../ui/matches_block';

class Block extends Component {
  state = {
    matches: [],
  };

  componentDidMount() {
    firebaseMatches
      .limitToLast(6)
      .once('value')
      .then(snapshot => {
        const matches = fireBaseLooper(snapshot);

        this.setState({
          matches: reverseArray(matches),
        });
      });
  }

  showMatches = matches => {
    if (!matches.length) return null;

    return matches.map(match => (
      <Slide bottom key={match.id}>
        <div className="item">
          <div className="wrapper">
            <MatchesBlock match={match} />
          </div>
        </div>
      </Slide>
    ));
  };

  render() {
    const { matches } = this.state;
    return <div className="home_matches">{this.showMatches(matches)}</div>;
  }
}

export default Block;
