import React from 'react';
import PropTypes from 'prop-types';

const PlayerCard = ({ name, lastName, number, background }) => (
  <div className="player_card_wrapper">
    <div
      className="player_card_thmb"
      style={{ background: `#f2f9ff url(${background})` }}
    />
    <div className="player_card_nfo">
      <div className="player_card_number">{number}</div>
      <div className="player_card_name">
        <span>{name}</span>
        <span>{lastName}</span>
      </div>
    </div>
  </div>
);

PlayerCard.propTypes = {
  name: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  background: PropTypes.string.isRequired,
};

export default PlayerCard;
