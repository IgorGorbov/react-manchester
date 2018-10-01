import React, { Component } from 'react';
import Reveal from 'react-reveal/Reveal';
import Stripes from '../../../resources/images/stripes.png';
import HomeCards from './cards';
import { Tag } from '../../ui/misc';

class MeetPlayers extends Component {
  state = {
    show: false,
  };

  render() {
    const { show } = this.state;
    return (
      <Reveal
        fraction={0.7}
        onReveal={() => {
          this.setState({
            show: true,
          });
        }}
      >
        <div
          className="home_meetplayers"
          style={{ background: `#fff url(${Stripes})` }}
        >
          <div className="container">
            <div className="home_meetplayers_wrapper">
              <div className="home_card_wrapper">
                <HomeCards show={show} />
              </div>
              <div className="home_text_wrapper">
                <Tag
                  background="#0e1731"
                  fontSize="100px"
                  color="#fff"
                  otherStyles={{
                    display: 'inline-block',
                    marginBottom: '20px',
                  }}
                >
                  Meet
                </Tag>
                <Tag
                  background="#0e1731"
                  fontSize="100px"
                  color="#fff"
                  otherStyles={{
                    display: 'inline-block',
                    marginBottom: '20px',
                  }}
                >
                  The
                </Tag>
                <Tag
                  background="#0e1731"
                  fontSize="100px"
                  color="#fff"
                  otherStyles={{
                    display: 'inline-block',
                    marginBottom: '20px',
                  }}
                >
                  Players
                </Tag>
                <Tag
                  background="#fff"
                  fontSize="27px"
                  color="#0e1731"
                  link
                  linkTo="/team"
                  otherStyles={{
                    display: 'inline-block',
                    marginBottom: '27px',
                    border: '1px solid #0e1731',
                  }}
                >
                  Meet them here
                </Tag>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    );
  }
}

export default MeetPlayers;
