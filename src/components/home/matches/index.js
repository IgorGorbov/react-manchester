import React from 'react';
import Block from './Blocks';
import { Tag } from '../../ui/misc';

const MatchesHome = () => (
  <div className="home_matches_wrapper">
    <div className="container">
      <Tag background="#0e1731" fontSize="50px" color="#fff">
        Matches
      </Tag>

      <Block />

      <Tag
        link
        linkTo="/team"
        background="#fff"
        fontSize="22px"
        color="#0e1731"
      >
        See more matches
      </Tag>
    </div>
  </div>
);

export default MatchesHome;
