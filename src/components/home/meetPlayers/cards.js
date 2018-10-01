import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
import PlayerCard from '../../ui/playerCard';
import Otamendi from '../../../resources/images/players/Otamendi.png';

class HomeCards extends Component {
  state = {
    cards: [
      {
        bottom: 90,
        left: 300,
      },
      {
        bottom: 60,
        left: 200,
      },
      {
        bottom: 30,
        left: 100,
      },
      {
        bottom: 0,
        left: 0,
      },
    ],
  };

  showAnimateCards = () => {
    const { cards } = this.state;
    const { show } = this.props;

    return cards.map(card => (
      <Animate
        key={card.left}
        show={show}
        start={{ left: 0, bottom: 0 }}
        enter={{
          left: [card.left],
          bottom: [card.bottom],
          timing: { duration: 1000, ease: easePolyOut },
        }}
      >
        {({ left, bottom }) => (
          <div style={{ position: 'absolute', left, bottom }}>
            <PlayerCard
              number={30}
              name="Nicolas"
              lastName="Otamendi"
              background={Otamendi}
            />
          </div>
        )}
      </Animate>
    ));
  };

  render() {
    return <div>{this.showAnimateCards()}</div>;
  }
}

HomeCards.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default HomeCards;
