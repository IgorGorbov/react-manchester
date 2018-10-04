import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';

import { CityLogo } from '../ui/icons';

const Header = ({ user }) => (
  <AppBar
    position="fixed"
    style={{
      backgroundColor: '#98c5e9',
      boxShadow: 'none',
      padding: '10px 0',
      borderBottom: '2px solid #00285e',
    }}
  >
    <Toolbar styles={{ display: 'flex' }}>
      <div style={{ flexGrow: 1 }}>
        <div className="header_logo">
          <CityLogo link linkTo="/" width="70px" height="70px" />
        </div>
      </div>

      <Link to="/team">
        <Button color="inherit">The team</Button>
      </Link>
      <Link to="/matches">
        <Button color="inherit">Matches</Button>
      </Link>

      {!user ? (
        <Link to="/sign-in">
          <Button color="inherit">Sign in</Button>
        </Link>
      ) : null}
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Header;
